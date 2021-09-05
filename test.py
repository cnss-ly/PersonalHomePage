import pymysql
from database_config import connectDatabase, executeInsertsql, executeLookupsql
import time

import os

blogdir = "./static/myblog"

TodayTime = time.localtime(time.time())
TodayTime = "{}.{}.{}".format(TodayTime[0], TodayTime[1], TodayTime[2])
print(TodayTime)
files = os.listdir(blogdir)
files.remove("blogtemplate.html")
print(files)
for i in range(len(files)):
    splitfile = files[i].split(".")
    blogtime = "{}.{}.{}".format(splitfile[0], splitfile[1], splitfile[2])
    # print(blogtime, i)
    if blogtime == TodayTime and splitfile[-1] == "html":
        content = []
        blogtemplate = []
        with open(os.path.join(blogdir,files[i]),"r") as read:
            buttle=1
            for line in read.readlines():
                if line != "<body class='typora-export'><div class='typora-export-content'>\n" and buttle:
                    continue
                else:
                    buttle=0
                    content.append(line)
                if line == "</body>\n":
                    break
            print(content)
        with open(os.path.join(blogdir,"blogtemplate.html"),"r") as read:
            blogtemplate = read.readlines()
        with open(os.path.join(blogdir,files[i]),"w") as write:
            for line in blogtemplate:
                write.write(line)
                if line == "<div class='typora-export'><div class='typora-export-content'>\n":
                    write.writelines(content[1:-1])
        break

# mysql_info = pymysql.connect(host="localhost",
#                              user="root",
#                              password="020509",
#                              database="PersonalHomePage",
#                              charset="utf8")
# cursor = mysql_info.cursor()
#
#
# insert_sql = """
# select * from MessageFromUser;
# """
# cursor.execute(insert_sql)
#
#
# select_sql = """
# select * from MessageFromUser;
# """
# cursor.execute(select_sql)
# a = cursor.fetchone()
# print(a)
# mysql_info.close()


# .like{
# font-size:66px;
# color:rgb(204,204,204);
# cursor:pointer;
# background: transparent;
# border-width:0px;
# }
#
#
# <!--				<div class="col-md-8 fh5co-widget" style="position:relative;left:100px">-->
# <!--					<button id="like" onclick="likeMe()" style="font-size:66px;-->
# <!--				color:rgb(204,204,204); cursor:pointer; background: transparent;border-width:0px;">&#10084</button></div>-->
# <!--				<div class="col-md-8 fh5co-widget" style="position:relative;left:123px" id="num"><h1></h1></div>-->
#
# <!--			</div>-->
# function likeMe(){
#     color = document.getElementById("like").style.color;
#     if (color=="rgb(204, 204, 204)"){
#     document.getElementById("like").style.color = "rgb(255,180,180)";
#     document.getElementById("num").innerHTML+=1
#     }else{
#     document.getElementById("like").style.color = "rgb(204,204,204)";
#     document.getElementById("num").innerHTML-=1
#     }
#     };


# <div class="desc col-md-5"><h7>&nbsp;</h7></div>

# look_sql = f"""
#                     select
#                     *
#                     from
#                     UserInfo
#                     where
#                     username="cnss"
#                     """
# result = executeLookupsql(look_sql)[0]
# print(result)
# if result!='':
#     if result
#         executeInsertsql(insert_sql)


# @web.route('/getChatinput', methods=["get", "post"])
# def getChatinput():
#     chatinput = request.values.get("chatinput")
#     insert_sql = f'''
#                 insert into
#                 ChatContent
#                 (content)
#                 value
#                 (\"{chatinput}\");
#                 '''
#     executeInsertsql(insert_sql)
#     print(chatinput)
#     return '1'
#
#
# @web.route('/getContent', methods=["get", "post"])
# def getContent():
#     num = request.values.get("num")
#     look_sql = f'''
#                 select
#                 *
#                 from
#                 ChatContent
#                 where
#                 num={num};
#                 '''
#     concent = executeLookupsql(look_sql)
#     print(concent[0])
#     return concent[0][1]
