from flask import Flask, render_template, request
import pymysql

web = Flask(__name__)


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


def saveMessage(mName, mEmail, mMessage):
    mysqlInsertMessage = pymysql.connect(host="localhost",
                                         user="root",
                                         password="020509",
                                         database="PersonalHomePage",
                                         charset="utf8")
    cursor = mysqlInsertMessage.cursor()
    insert_sql = f"""
    insert into 
    MessageFromUser
    (Name,Email,Message)
    value
    (\"{mName}\",\"{mEmail}\",\"{mMessage}\");
    """
    # print(insert_sql)
    try:
        cursor.execute(insert_sql)
        mysqlInsertMessage.commit()
    except:
        mysqlInsertMessage.rollback()
    mysqlInsertMessage.close()


@web.route('/getMessage', methods=["get", "post"])
def getMessage():
    mName = request.values.get("mName")
    mEmail = request.values.get("mEmail")
    mMessage = request.values.get("mMessage")
    if '' not in [mMessage, mEmail, mName]:
        # print(mName, mEmail, mMessage)
        saveMessage(mName, mEmail, mMessage)
        return '1'
    else:
        return ''


if __name__ == '__main__':
    web.run(host="0.0.0.0")
