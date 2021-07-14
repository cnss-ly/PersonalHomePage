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
    id int unsigned primary key auto_increment,
 	chathead text,
 	username varchar(16),
 	posswd varchar(16)
);
mysql> desc MessageFromUser;
+---------+--------------+------+-----+---------+-------+
| Field   | Type         | Null | Key | Default | Extra |
+---------+--------------+------+-----+---------+-------+
| id      | int unsigned | NO   | PRI | NULL    |       |
| Name    | text         | YES  |     | NULL    |       |
| Email   | text         | YES  |     | NULL    |       |
| Message | text         | YES  |     | NULL    |       |
+---------+--------------+------+-----+---------+-------+
```

---

```mysql
create table MessageFromUser(
    id int unsigned primary key,
    Name text,
    Email text,
    Message text
);
mysql> desc UserInfo;
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int unsigned | NO   | PRI | NULL    | auto_increment |
| chathead | text         | YES  |     | NULL    |                |
| username | varchar(16)  | YES  |     | NULL    |                |
| posswd   | varchar(16)  | YES  |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
```

---

