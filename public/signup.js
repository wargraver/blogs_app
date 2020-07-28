function signup(name,pass,done){
    $.post('/user/signup',{
        name:name,
        password:pass
    },function(data){
        done(data)
    })
}
$(function(){
    let email=$('#email')
    let name=$('#name')
    let password=$('#password')
    console.log(name.val(),email.val(),password.val())
    $('#add32').click(function(){
        console.log(email.val(),name.val(),password.val())
        signup(name.val(),password.val(),function(data){
              // window.alert('created the user')
               window.localStorage.check='vbjkbksjkv'
        console.log(window.localStorage)
        window.location.replace('http://localhost:3000/login.html')
        })
    }
    )
})