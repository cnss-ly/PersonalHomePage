var scroll = document.getElementById("scroll");
scroll.scrollTop=scroll.scrollHeight;

namespace = '/chat';
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);


function chatInput() {
    var chatinputarea = document.getElementById("chatinputarea");
    chatinput = chatinputarea.value;
    var username = document.getElementById("username").innerHTML;
    var chathead = document.getElementById("chathead").src;
//    alert(chathead)
    chathead = String(chathead).split("/")[5]
//    alert(chathead)
    if (username!='No Login'){
    socket.emit('chatinput',{'content':chatinput,'username':username,'chathead':chathead});
    chatinputarea.value='';
    }else{
    window.alert('please login')
    }
};


socket.on('showchatinput', function (res) {
        var username = document.getElementById("username").innerHTML;
        if (username == res['username']){
            var popContent = '<h4 align="right">'
            + username
            + '</h4>'
            + '<div class="receiver col-md-14"><div><img src="static/ChatHead/'
            + res['userhead']
            + '" width="50" height="50"></div><div><div class="right_triangle"></div><span>'
            + res['content']
            + '</span></div></div>'
            + '<HR style="FILTER:alpha(opacity=100,finishopacity=0,style=2)" width="100%" color="#F5FFFA" SIZE="5">';
        }
        else{
            var popContent = '<h4 align="right">'
            + "&nbsp;&nbsp;&nbsp;&nbsp;"
            + username
            + '</h4>'
            + '<div class="sender col-md-12"><div><img src="static/ChatHead/'
            + res['userhead']
            + '" width="50" height="50"></div><div><div class="left_triangle"></div><span>'
            + res['content']
            + '</span></div></div>'
            + '<HR style="FILTER:alpha(opacity=100,finishopacity=0,style=2)" width="100%" color="#F5FFFA" SIZE="5">';
        }
//        alert(popContent)
        $("#chatshowarea").append(popContent);
        var scroll = document.getElementById("scroll");
        scroll.scrollTop=scroll.scrollHeight;
    });


function chatClear() {
  var chatinputarea = document.getElementById("chatinputarea");
   chatinputarea.value='';
};
