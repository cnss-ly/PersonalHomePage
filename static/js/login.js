      var login=document.getElementById('login');
             // 1.点击"点击，弹出登陆框",弹出登陆窗口和遮盖层
             var loginBtn=document.getElementById('loginBtn');
             loginBtn.onclick=function(){
                 login.style.display="block";
                 return false;
             }
             // 2.点击"关闭",隐藏登陆窗口和遮盖层
             var closelogin=document.getElementById('closelogin');
             closelogin.onclick=function(){
                 login.style.display="none";
                 return false;
             }



function ajax_signIn(loginusername, loginpossword) {
  $.ajax({
    type: "post",
    url: "/signIn",
    data: {
      "loginusername": loginusername,
      "loginpossword": loginpossword,
    },
    datatype: "json",
    success: function(replay) {
      if (replay == '') {
        window.alert('please don\'t enter null values.');
      } else if(replay == '0'){
        window.alert('possword error.');
      }else {
//        window.alert("Login success!");
        document.getElementById("username").innerHTML=replay['username']
        document.getElementById("chathead").src="static/ChatHead/"+replay['chathead']
        document.getElementById("infoweizhi").innerHTML=replay['infoweizhi']
        document.getElementById("infoyouxiang").innerHTML=replay['infoyouxiang']
        document.getElementById("infoshouji").innerHTML=replay['infoshouji']
        login.style.display="none";
        var chat_100 = String(replay['chat_100']).split(",")
//        alert(chat_100)
//        alert(chat_100.length)
        document.getElementById("chatshowarea").innerHTML = "";
        for(i=chat_100.length-1;i>0;i-=5){
        if (replay['id'] == chat_100[i-3]){
            var popContent = '<h4 align="right">'
            + chat_100[i-2]
            + '</h4>'
            + '<div class="receiver col-md-14"><div><img src="static/ChatHead/'
            + chat_100[i-1]
            + '" width="50" height="50"></div><div><div class="right_triangle"></div><span>'
            + chat_100[i]
            + '</span></div></div>'
            + '<HR style="FILTER:alpha(opacity=100,finishopacity=0,style=2)" width="100%" color="#F5FFFA" SIZE="5">';
        }
        else{
            var popContent = '<h4>'
            + "&nbsp;&nbsp;&nbsp;&nbsp;"
            + chat_100[i-2]
            + '</h4>'
            + '<div class="sender col-md-12"><div><img src="static/ChatHead/'
            + chat_100[i-1]
            + '" width="50" height="50"></div><div><div class="left_triangle"></div><span>'
            + chat_100[i]
            + '</span></div></div>'
            + '<HR style="FILTER:alpha(opacity=100,finishopacity=0,style=2)" width="100%" color="#F5FFFA" SIZE="5">';
        }
//        alert(popContent)
        $("#chatshowarea").append(popContent);
        }
        var scroll = document.getElementById("scroll");
        scroll.scrollTop=scroll.scrollHeight;
      }
    },
    error: function() {
      window.alert("Maybe something error...");
    }
  });
}

function signIn() {
  var loginusername = document.getElementById("loginusername");
  var loginpossword = document.getElementById("loginpossword");
  loginusername = loginusername.value;
  loginpossword = loginpossword.value;
  ajax_signIn(loginusername,loginpossword);
};



function signOut() {
    document.getElementById("username").innerHTML='No Login';
    document.getElementById("infoweizhi").innerHTML='None';
    document.getElementById("infoyouxiang").innerHTML='None';
    document.getElementById("infoyouxiang").innerHTML='None';
}


//------------------------------------------------------------------

      var info=document.getElementById('info');
             // 1.点击"点击，弹出info框",弹出info窗口
             var infoBtn=document.getElementById('infoBtn');
             infoBtn.onclick=function(){
                 info.style.display="block";
                 return false;
             }
             // 2.点击"关闭",隐藏登陆窗口和遮盖层
             var closeinfo=document.getElementById('closeinfo');
             closeinfo.onclick=function(){
                 info.style.display="none";
                 return false;
             }



function ajax_Info(infoyouxiang,infoweizhi,infoshouji,loginusername) {
  $.ajax({
    type: "post",
    url: "/Info",
    data: {
        "infoweizhi":infoweizhi,
        "infoyouxiang":infoyouxiang,
        "infoshouji":infoshouji,
        "loginusername":loginusername,
    },
    datatype: "json",
    success: function(replay) {
        if (replay == '') {
        window.alert('please don\'t enter null values.');
        }else {
        document.getElementById("infoweizhi").innerHTML=replay['infoweizhi']
        document.getElementById("infoyouxiang").innerHTML=replay['infoyouxiang']
        document.getElementById("infoshouji").innerHTML=replay['infoshouji']
        info.style.display="none";
        }
    },
    error: function() {
      window.alert("Maybe something error...");
    }
  });
}

function saveInfo() {
  var loginusername = document.getElementById("loginusername");
  var infoweizhi = document.getElementById("weizhi");
  var infoyouxiang = document.getElementById("youxiang");
  var infoshouji = document.getElementById("shouji");
  loginusername = loginusername.value;
//  alert(loginusername)
  infoshouji = infoshouji.value;
  infoweizhi = infoweizhi.value;
  infoyouxiang = infoyouxiang.value;
  ajax_Info(infoyouxiang,infoweizhi,infoshouji,loginusername);
};






function ajax_Photo(photo_base64,username,id) {
  $.ajax({
    type: "post",
    url: "/Photo",
    data: {
        "photo_base64":photo_base64,
        "username":username,
    },
    datatype: "json",
    success: function(replay) {
//        if (replay == '') {
//
//        }else {
//
//        }
    },
    error: function() {
      window.alert("Maybe something error...");
    }
  });
}

    var upload = function (c, d) {
        "use strict";
        var $c = document.querySelector(c),
            $d = document.querySelector(d),
            file = $c.files[0],
            reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var username = document.getElementById("username");
            ajax_Photo(e.target.result,username.innerHTML);
            $d.setAttribute("src", e.target.result);
        };
    };