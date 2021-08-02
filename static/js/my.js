function ajax_post(Name, Email, Message) {
  $.ajax({
    type: "post",
    url: "/getMessage",
    data: {
      "mName": Name,
      "mEmail": Email,
      "mMessage": Message
    },
    datatype: "json",
    success: function(replay) {
      if (replay == '') {
        window.alert('please don\'t enter null values.');
      } else {
        window.alert("Thank you!");
      }
    },
    error: function() {
      window.alert("Maybe something error...");
    }
  });
}

function getMessage() {
  var Name = document.getElementById("mName");
  var Email = document.getElementById("mEmail");
  var Message = document.getElementById("mMessage");
  Name = Name.value;
  Email = Email.value;
  Message = Message.value;
  ajax_post(Name, Email, Message);
};

//--------------------------------------------------------------------

