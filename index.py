from flask import Flask, render_template, request, jsonify
from database_config import connectDatabase, executeInsertsql, executeLookupsql
from flask_socketio import SocketIO, emit,send

web = Flask(__name__)
web.config['SECRET_KEY'] = 'secret_key'
socketio = SocketIO()
socketio.init_app(web,cors_allowed_origins='*')
name_space = '/chat'

# @web.route('/')
# def indexaaa():
#     return render_template('indexaaa.html')

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
    replay = jsonify({'username': loginusername})
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
                print('signin successful')
                return replay
            else:
                print('possword error')
                return '0'
        else:
            insert_sql = f"""
                        insert into 
                        UserInfo
                        (username,posswd)
                        value
                        (\"{loginusername}\",\"{loginpossword}\");
                        """
            executeInsertsql(insert_sql)
            print('new user')
            return replay
    else:
        return ''


@socketio.on('chatinput', namespace=name_space)
def mtest_message(message):
    print(message)
    event_name = 'showchatinput'
    emit(event_name, message['content'], broadcast=True, namespace=name_space)


# @web.route('/push')
# def push_once():
#     event_name = 'dcenter'
#     broadcasted_data = {'data': "test message!"}
#     emit(event_name, broadcasted_data, broadcast=True, namespace=name_space)
#     return 'done!'
#
#
# @socketio.on("connect",namespace=name_space)
# def handle_connect():
#     print("server has connected")
#
# @socketio.on('disconnect', namespace=name_space)
# def disconnect_msg():
#     print('client disconnected.')




# @socketio.on('my_event')
# def my_event(content):
#     print("服务器已经接收到消息：" + content)
#     # emit("my_response", "服务器已经接收到消息：" + message["data"], broadcast=True)
#     event_name = 'dcenter'
#     broadcasted_data = {'data': "test message!"}
#     socketio.emit(event_name, broadcasted_data, broadcast=False, namespace=name_space)


if __name__ == '__main__':
    socketio.run(web, host="0.0.0.0", port=5000,debug=True)
