function ajax_post(Name,Email,Message){
    $.ajax({
    type:"post",
    url:"/getMessage",
    data:{"mName":Name,"mEmail":Email,"mMessage":Message},
    datatype:"json",
    success:function (replay) {
    if (replay==''){
        window.alert('please don\'t enter null values.');
    }
    else{
        window.alert("Thank you!");
    }
    },error:function () {
    window.alert("Maybe something error...");
    }
    });
}
function getMessage(){
    var Name = document.getElementById("mName");
    var Email = document.getElementById("mEmail");
    var Message = document.getElementById("mMessage");
    Name = Name.value;
    Email = Email.value;
    Message = Message.value;
    ajax_post(Name,Email,Message);
    };

//--------------------------------------------------------------------

function ajax_signIn(username,posswd,chathead){
    $.ajax({
    type:"post",
    url:"/signIn",
    data:{"username":username,"posswd":posswd,"chathead":chathead},
    datatype:"json",
    success:function (replay) {
    if (replay==''){
        window.alert('please don\'t enter null values.');
    }
    else{
        window.alert("Thank you!");
    }
    },error:function () {
    window.alert("Maybe something error...");
    }
    });
}
function signIn(){
    var username = document.getElementById("mName");
    var posswd = document.getElementById("mEmail");
    var chathead = document.getElementById("mMessage");
    Name = Name.value;
    Email = Email.value;
    Message = Message.value;
    ajax_signIn(Name,Email,Message);
    };



//------------------------------------------------------------------------
