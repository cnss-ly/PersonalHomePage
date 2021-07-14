import pymysql

mysql_info = pymysql.connect(host="localhost",
                             user="root",
                             password="020509",
                             database="PersonalHomePage",
                             charset="utf8")
cursor = mysql_info.cursor()


insert_sql = """
select * from MessageFromUser;
"""
cursor.execute(insert_sql)


select_sql = """
select * from MessageFromUser;
"""
cursor.execute(select_sql)
a = cursor.fetchone()
print(a)
mysql_info.close()


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