function check_login(name,pass,done){
    $.post('/user/login',{
        name:name,
        password:pass
    },function(data){
        done(data)
    })
}
$(function(){
   let name=$('#email')
   let pass=$('#password')
   $('#btn1').click(function(){
       console.log(name.val(),pass.val())
       check_login(name.val(),pass.val(),function(data){
           console.log(data)
           if(data.tok===null) window.alert('Invalid credentials or Sign Up first')
           else{
           window.localStorage.tok=data.tok2
           console.log(window.localStorage)
         //  window.alert('Succesfully loggedin')
           window.location.replace('http://localhost:3000/post.html')
           }
       })
   })
}

)