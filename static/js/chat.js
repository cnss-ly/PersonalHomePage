var scroll = document.getElementById("scroll");
scroll.scrollTop=scroll.scrollHeight;

namespace = '/chat';
    var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port + namespace);


function chatInput() {
    var chatinputarea = document.getElementById("chatinputarea");
    chatinput = chatinputarea.value;
//    window.alert(chatinput)
    socket.emit('chatinput',{'content':chatinput});
    chatinputarea.value='';

};


socket.on('showchatinput', function (res) {
        var popContent ='<div class="receiver col-md-12"><div><img src="static/images/img_bg_4.jpg" width="50" height="50"></div><div><div class="right_triangle"></div><span>'+
        res+'</span></div></div>';
        $("#chatshowarea").append(popContent);
        var scroll = document.getElementById("scroll");
scroll.scrollTop=scroll.scrollHeight;
    });


function ajax_chat(chatinput) {
  $.ajax({
    type: "post",
    url: "/getChatinput",
    data: {
      "chatinput": chatinput,
    },
    datatype: "json",
    success: function(replay) {

    },
    error: function() {
      window.alert("Maybe something error...");
    }
  });
}


function chatClear() {
  var chatinputarea = document.getElementById("chatinputarea");
   chatinputarea.value='';
};

//------------------------------------------------------------------------

//function ajax_concent(num) {
//  $.ajax({
//    type: "post",
//    url: "/getContent",
//    data: {
//        "num":num,
//    },
//    datatype: "json",
//    success: function(replay) {
//        var popContent ='<div class="receiver"><div><img src="static/images/img_bg_4.jpg" width="50" height="50"></div><div><div class="right_triangle"></div><span>'+
//        replay+'</span></div></div>';
//        $("#chatshowarea").append(popContent);
//        var scroll = document.getElementById("scroll");
//        scroll.scrollTop=scroll.scrollHeight;
//    },
//    error: function() {
//      window.alert("Maybe something error...");
//    }
//  });
//}
