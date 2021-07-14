      var login=document.getElementById('login');
             var bg=document.getElementById('bg');
             // 1.点击"点击，弹出登陆框",弹出登陆窗口和遮盖层
             var loginBtn=document.getElementById('loginBtn');
             loginBtn.onclick=function(){
                 login.style.display="block";
                 bg.style.display="block";
                 return false;
             }
             // 2.点击"关闭",隐藏登陆窗口和遮盖层
             var closelogin=document.getElementById('closelogin');
             closelogin.onclick=function(){
                 login.style.display="none";
                 bg.style.display="none";
                 return false;
             }
             // 3.鼠标拖拽功能
             var login_title=document.getElementById('login-title');
             login_title.onmousedown=function(e){
                 e = e || window.event;
                 var x=e.pageX || e.clientX +(document.body.scrollLeft || document.documentElement.scrollLeft);
                 var y=e.pageY || e.clientY +(document.body.scrollTop || document.documentElement.scrollTop);

                 var boxX=login.offsetLeft;
                 var boxY=login.offsetTop;

                 var mouse_in_boxX=x-boxX;
                 var mouse_in_boxY=y-boxY;

                 document.onmousemove=function(e){
                     var x=e.pageX || e.clientX +(document.body.scrollLeft || document.documentElement.scrollLeft);
                     var y=e.pageY || e.clientY +(document.body.scrollTop || document.documentElement.scrollTop);

                     login.style.left=x-mouse_in_boxX+256+'px';
                     login.style.top=y-mouse_in_boxY-142+'px';
                 }
             }

             login_title.onmouseup = function(){
                 document.onmousemove=null;
             }


//---------------------------------------------------------

      var register=document.getElementById('register');
             var bg=document.getElementById('bg');
             // 1.点击"点击，弹出注册框",弹出注册窗口和遮盖层
             var registerBtn=document.getElementById('registerBtn');
             registerBtn.onclick=function(){
                 register.style.display="block";
                 bg.style.display="block";
                 return false;
             }
             // 2.点击"关闭",隐藏注册窗口和遮盖层
             var closeregister=document.getElementById('closeregister');
             closeregister.onclick=function(){
                 register.style.display="none";
                 bg.style.display="none";
                 return false;
             }
             // 3.鼠标拖拽功能
             var register_title=document.getElementById('register-title');
             register_title.onmousedown=function(e){
                 e = e || window.event;
                 var x=e.pageX || e.clientX +(document.body.scrollLeft || document.documentElement.scrollLeft);
                 var y=e.pageY || e.clientY +(document.body.scrollTop || document.documentElement.scrollTop);

                 var boxX=login.offsetLeft;
                 var boxY=login.offsetTop;

                 var mouse_in_boxX=x-boxX;
                 var mouse_in_boxY=y-boxY;

                 document.onmousemove=function(e){
                     var x=e.pageX || e.clientX +(document.body.scrollLeft || document.documentElement.scrollLeft);
                     var y=e.pageY || e.clientY +(document.body.scrollTop || document.documentElement.scrollTop);

                     register.style.left=x-mouse_in_boxX+256+'px';
                     register.style.top=y-mouse_in_boxY-142+'px';
                 }
             }

             register_title.onmouseup = function(){
                 document.onmousemove=null;
             }