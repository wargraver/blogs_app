function getposts(done){
    $.get('/post',{tok:window.localStorage.tok},function(data){
        done(data)
    })
}
function createpost(data){
    return $(`<div class="card ml-5 mr-5 mb-5" style="width: 25rem;">
    <div class="card-body ml-5 mr-5 mb-5">
      <h5 class="card-title"></h5>
      <h6 class="card-subtitle mb-2 text-muted">${data.user.name}</h6>
      <p class="card-text">${data.post}</p>
      <a href="#" class="card-link">Like</a>
      <a href="#" class="card-link">Read</a>
    </div>
  </div>`)
}
$(function(){
    let list=$('#val')
    console.log(list)
   getposts(function(data){
       list.empty()
       window.alert('data received')
       console.log(data)
       for(let i=0;i<data.length;i++){
           list.append(createpost(data[i]))
       }
   })
})