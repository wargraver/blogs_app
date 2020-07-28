function createposts(cont,done){
    $.post('/post',{post:cont,
    tok:window.localStorage.tok
    },function(data){
        done(data)
    })
}
$(function(){
 const val=$('#text')
 console.log(val)
  $('#btn1').click(function(){
      console.log(val.val())
     createposts(val.val(),function(data){
         console.log(data)
         window.location.replace('http://localhost:3000/post.html')
     })
  })
})