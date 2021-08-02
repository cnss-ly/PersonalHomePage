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
//        document.getElementById("username").innerHTML=replay['infoweizhi']
//        document.getElementById("username").innerHTML=replay['infoyouxiang']
//        document.getElementById("username").innerHTML=replay['infoyouxiang']
        login.style.display="none";
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
    document.getElementById("username").innerHTML='No&nbsp;Login'
    document.getElementById("infoweizhi").innerHTML='None'
    document.getElementById("infoyouxiang").innerHTML='None'
    document.getElementById("infoyouxiang").innerHTML='None'
}