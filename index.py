from flask import Flask, render_template, request, jsonify
from database_config import executeInsertsql, executeLookupsql
from flask_socketio import SocketIO, emit
import base64
from PIL import Image
import os

web = Flask(__name__)
web.config['SECRET_KEY'] = 'secret_key'
socketio = SocketIO()
socketio.init_app(web, cors_allowed_origins='*')
name_space = '/chat'


@web.route('/index')
def index():
    return render_template('index.html')


@web.route('/about')
def about():
    return render_template('about.html')


@web.route('/blog')
def blog():
    return render_template('blog.html')


@web.route('/work')
def work():
    return render_template('work.html')


@web.route('/contact')
def contact():
    return render_template('contact.html')


# -----------------------------------------------------------------------------


@web.route('/getMessage', methods=["get", "post"])
def getMessage():
    mName = request.values.get("mName")
    mEmail = request.values.get("mEmail")
    mMessage = request.values.get("mMessage")
    if '' not in [mMessage, mEmail, mName]:
        print(mName, mEmail, mMessage)
        insert_sql = f"""
            insert into 
            MessageFromUser
            (Name,Email,Message)
            value
            (\"{mName}\",\"{mEmail}\",\"{mMessage}\");
            """
        executeInsertsql(insert_sql)
        return '1'
    else:
        return ''


@web.route('/signIn', methods=["get", "post"])
def signIn():
    loginusername = request.values.get("loginusername")
    loginpossword = request.values.get("loginpossword")
    if '' not in [loginusername, loginpossword]:
        print(loginusername, loginpossword)
        look_sql = f"""
                    select
                    *
                    from
                    UserInfo
                    where
                    username=\"{loginusername}\"
                    """
        result = executeLookupsql(look_sql)
        if result:
            result = result[0]
            if result[3] == loginpossword:
                update_sql = f"""
                                    update 
                                    UserInfo
                                    set
                                    loginstatus=1
                                    where
                                    username=\"{loginusername}\"
                                    """
                executeInsertsql(update_sql)
                print('signin successful')
            else:
                print('possword error')
                return '0'
        else:
            insert_sql = f"""
                        insert into 
                        UserInfo
                        (username,posswd,loginstatus)
                        value
                        (\"{loginusername}\",\"{loginpossword}\",1);
                        """
            executeInsertsql(insert_sql)
            print('new user')
            look_sql = f"""
                                select
                                *
                                from
                                UserInfo
                                where
                                username=\"{loginusername}\"
                                """
            result = executeLookupsql(look_sql)
            result = result[0]

        find_sql = f"""
                    select
                    *
                    from
                    ChatContent
                    order by
                    num
                    desc limit
                    10
                    """
        chat_100 = executeLookupsql(find_sql)
        print(chat_100)

        replay = jsonify({'id': result[0],'username': result[2], 'infoyouxiang': result[5], 'infoweizhi': result[4],
                          'infoshouji': result[6], 'chathead': result[1], 'chat_100': chat_100})
        return replay
    else:
        return ''


@web.route('/Info', methods=["get", "post"])
def Info():
    loginusername = request.values.get("loginusername")
    infoyouxiang = request.values.get("infoyouxiang")
    infoweizhi = request.values.get("infoweizhi")
    infoshouji = request.values.get("infoshouji")
    replay = jsonify({'infoyouxiang': infoyouxiang, 'infoweizhi': infoweizhi, 'infoshouji': infoshouji})
    if '' not in [infoyouxiang, infoweizhi, infoshouji]:
        print(infoyouxiang, infoweizhi, infoshouji)
        update_sql = f"""
                        update 
                        UserInfo
                        set
                        address=\"{infoweizhi}\",email=\"{infoyouxiang}\",phone=\"{infoshouji}\"
                        where
                        username=\"{loginusername}\"
                        """
        executeInsertsql(update_sql)
        return replay
    else:
        return ''


@web.route('/Photo', methods=["get", "post"])
def Photo():
    try:
        photo_base64 = request.values.get("photo_base64")
        username = request.values.get("username")
        look_sql = f"""
                            select
                            *
                            from
                            UserInfo
                            where
                            username=\"{username}\"
                            """
        id = executeLookupsql(look_sql)[0][0]
        # print(photo_base64[:50])
        photo_base64 = photo_base64.split('base64,', 1)[1]
        # print(photo_base64[:50])
        photo = base64.b64decode(photo_base64)
        save = open('static/ChatHead/{}.jpg'.format(id), 'wb')
        save.write(photo)
        update_sql = f"""
                    update 
                    UserInfo
                    set
                    chathead=\"{id}.jpg\"
                    where
                    username=\"{username}\"
                    """
        executeInsertsql(update_sql)
        return '1'
    except:
        return '0'


@socketio.on('chatinput', namespace=name_space)
def mtest_message(message):
    username = message['username']
    content = message['content']
    chathead = message['chathead']
    look_sql = f"""
                select 
                *
                from
                UserInfo
                where
                username=\"{username}\"
                """
    result = executeLookupsql(look_sql)[0]
    userid = result[0]
    userhead = result[1]
    print(userid, '|', username, '|', content)
    insert_sql = f"""
                insert into
                ChatContent
                (id,username,content,chathead)
                value
                (\"{userid}\",\"{username}\",\"{content}\",\"{chathead}\")
                """
    # print(insert_sql)
    executeInsertsql(insert_sql)
    event_name = 'showchatinput'
    emit(event_name, {'userhead': userhead, 'content': content, 'username': username}, broadcast=True,
         namespace=name_space)


if __name__ == '__main__':
    socketio.run(web, host="0.0.0.0", port=5000, debug=True)
