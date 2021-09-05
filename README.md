>使用说明

要求python3.6及以上版本

在主目录依次执行

python install -r requirements

python index.py

> 已解决bug

1. flask目录格式要求

   ├── index.py      #主文件
   ├── static        #css、js、图片等文件
   │   ├── css
   │   ├── fonts
   │   └── js
   ├── templates     #html文件

2. flask引用本地资源要求

   ```html
   例：<link rel="stylesheet" href="{{ url_for('static', filename='css/animate.css') }}"/>
      <script src="{{ url_for('static', filename='js/jquery-3.6.0.min.js') }}"></script>
   ```

3. js获取html输入框值

   ```
   
   ```

   ```javascript
   function getMessage(){
       var Name = document.getElementById("idname");	//通过id定位元素
       Name = Name.value;	//取值
       ajax_post(value)		//调用ajax函数
       };
   ```

4. ajax函数要求

   ```javascript
   function ajax_post(value){
       //此处不能写其他代码
       $.ajax({
       type:"post",
       url:"/routeName",	//通过route与主文件对应
       data:{"name":value},	//传给python的数据
       datatype:"json",
       success:function (data1) {	//data1为主文件对应/route函数返回值
           
       }
       },error:function () {	//运行错误执行error
           
       }
       });
   }
   ```

5. 主文件ajax对应route

   ```python
   @web.route('/routeName', methods=["get", "post"])
   def getMessage():
       value = request.values.get("name")	#使用flask的request
       return data1	#不能返回int
   ```

   

```javascript

```

> 数据库建设
---

```mysql
create table UserInfo(
    id int(4) unsigned primary key auto_increment comment '用户唯一id',
 	chathead varchar(50) default "nologin.jpg" comment '用户头像',
 	username varchar(16) not null comment '用户名',
 	posswd varchar(16) not null comment '密码',
    address varchar(100) default "None" comment '用户地址',
    email varchar(32) default "None" comment '用户邮箱',
    phone varchar(16) default "None" comment '手机号',
    loginstatus int(1) not null default '0' comment '登录状态'
)character set = utf8;

mysql> desc UserInfo;
+-------------+--------------+------+-----+-------------+----------------+
| Field       | Type         | Null | Key | Default     | Extra          |
+-------------+--------------+------+-----+-------------+----------------+
| id          | int unsigned | NO   | PRI | NULL        | auto_increment |
| chathead    | varchar(50)  | YES  |     | nologin.jpg |                |
| username    | varchar(16)  | NO   |     | NULL        |                |
| posswd      | varchar(16)  | NO   |     | NULL        |                |
| address     | varchar(100) | YES  |     | None        |                |
| email       | varchar(32)  | YES  |     | None        |                |
| phone       | varchar(16)  | YES  |     | None        |                |
| loginstatus | int          | NO   |     | 0           |                |
+-------------+--------------+------+-----+-------------+----------------+
```

---

```mysql
create table MessageFromUser(
    Name varchar(16) comment '名字',
    Email varchar(32) comment '邮箱',
    Message varchar(255) comment '信息内容'
)character set = utf8;

mysql> desc MessageFromUser;
+---------+--------------+------+-----+---------+-------+
| Field   | Type         | Null | Key | Default | Extra |
+---------+--------------+------+-----+---------+-------+
| Name    | varchar(16)  | YES  |     | NULL    |       |
| Email   | varchar(32)  | YES  |     | NULL    |       |
| Message | varchar(255) | YES  |     | NULL    |       |
+---------+--------------+------+-----+---------+-------+
```



---

```mysql
create table ChatContent(
    num int(4) unsigned primary key auto_increment comment 'chat number',
    id int(4) comment '用户唯一id',
    username varchar(16) not null comment '用户名',
    chathead varchar(50) default "nologin.jpg" comment '用户头像',
    content varchar(100) comment '聊天内容'
)character set = utf8;

mysql> desc ChatContent;
+----------+--------------+------+-----+-------------+----------------+
| Field    | Type         | Null | Key | Default     | Extra          |
+----------+--------------+------+-----+-------------+----------------+
| num      | int unsigned | NO   | PRI | NULL        | auto_increment |
| id       | int          | YES  |     | NULL        |                |
| username | varchar(16)  | NO   |     | NULL        |                |
| chathead | varchar(50)  | YES  |     | nologin.jpg |                |
| content  | varchar(100) | YES  |     | NULL        |                |
+----------+--------------+------+-----+-------------+----------------+


```

---

```mysql
create table BlogInfo(
    num int(4) unsigned primary key auto_increment,
    filename varchar(20),
    theme varchar(50),
	intro varchar(150),
    vartime varchar(20),
    upvote int(4) default 0,
    pageview int(4) default 0,
    content text
)character set = utf8;

mysql> desc BlogInfo;
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| num      | int unsigned | NO   | PRI | NULL    | auto_increment |
| filename | varchar(20)  | YES  |     | NULL    |                |
| theme    | varchar(50)  | YES  |     | NULL    |                |
| intro    | varchar(150) | YES  |     | NULL    |                |
| vartime  | varchar(20)  | YES  |     | NULL    |                |
| upvote   | int          | YES  |     | 0       |                |
| pageview | int          | YES  |     | 0       |                |
| content  | text         | YES  |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
```



