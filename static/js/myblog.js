$.ajax({
    type: "post",
    url: "/blogCard",
    data: {
    },
    datatype: "json",
    success: function(replay) {
    blogcards = replay["blogcards"]
    var createBlogCards = '';
    for(i=0;i<blogcards.length;i++){
//    alert(blogcards[i])

        var createBlogCard = '<div class="col-md-4"><div class="fh5co-blog animate-box fadeInUp animated-fast"><div class="blog-text"><h2><a href="/static/myblog/_'
    +blogcards[i][1]
    +'">'
    +blogcards[i][2]
    +'</a></h2><p>'
    +blogcards[i][3]
    +'</p><span class="posted_on">'
    +blogcards[i][4]
    +'</span><ul class="stuff"><li><i class="icon-heart3"></i>'
    +blogcards[i][5]
    +'</li><li><i class="icon-eye2"></i>'
    +blogcards[i][6]
    +'</li><li><a href="/static/myblog/_'
    +blogcards[i][1]
    +'">Read All<i class="icon-arrow-right22"></i></a></li></ul></div></div></div>';

    createBlogCards+=createBlogCard

    }
//         alert(createBlogCards)
    $("#blogCard").append(createBlogCards);

    },
    error: function() {
      window.alert("Maybe something error...");
    }
  });





