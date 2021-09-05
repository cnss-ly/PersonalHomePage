function ajax_showBlog() {
  $.ajax({
    type: "post",
    url: "/showBlog",
    data: {},
    datatype: "json",
    success: function(replay) {
      if (replay == '') {
        window.alert('please don\'t enter null values.');
      } else {
      document.getElementById("RELEASED").innerHTML = "";
      document.getElementById("UNRELEASED").innerHTML = "";
        releasedBlogs = replay["releasedBlogs"]
        unreleasedBlogs = replay["unreleasedBlogs"]
//        alert(releasedBlogs)
//        alert(unreleasedBlogs)
        for(i=0;i<releasedBlogs.length;i++){
        var popContent = "<h4>"
        +releasedBlogs[i]
        +"</h4>";
        $("#RELEASED").append(popContent);
        }
        for(i=0;i<unreleasedBlogs.length;i++){
        var popContent = "<h4>"
        +unreleasedBlogs[i]
        +"</h4>";
        $("#UNRELEASED").append(popContent);
        }
      }
    },
    error: function() {
      window.alert("Maybe something error...");
    }
  });
}


var info=document.getElementById('info');
             var infoBtn=document.getElementById('postblog');
             infoBtn.onclick=function(){
                 ajax_showBlog();
                 if(info.style.display=="block"){
                 info.style.display="none";
                 }
                 else{
                 info.style.display="block";
                 }
                 return false;
             }
//=================================================================================


function ajax_postBlog(choiceblog,theme,intro) {
  $.ajax({
    type: "post",
    url: "/postBlog",
    data: {
      "choiceblog":choiceblog,
      "theme":theme,
      "intro":intro,
    },
    datatype: "json",
    success: function(replay) {
    },
    error: function() {
      window.alert("Maybe something error...");
    }
  });
}

function postBlog(){
    var choiceblog = document.getElementById("choiceblog");
    var theme = document.getElementById("theme");
    var intro = document.getElementById("intro");
    choiceblog = choiceblog.value;
    theme = theme.value;
    intro = intro.value;
//    alert(choiceblog);
    ajax_postBlog(choiceblog,theme,intro);
}



