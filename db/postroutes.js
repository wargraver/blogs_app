const post=require('./db.js').post
const user=require('./db.js').user
const route=require('express').Router()
const auth=require('./auth.js').auth
route.get('/post/:id',auth,async (req,res)=>{
      try{
          const data=await post.findAll({where:{
              id:req.params.id
          },include:user})
          res.status(200).send(data)
      }
      catch(error){
          res.status(404).send({
              error:"could not find post for this user"
          })
      }
})
route.get('/post',auth,async (req,res)=>{
    try{
       const data=await post.findAll({include:user})
       res.status(200).send(data)
    }
    catch(error){
        res.status(404).send({
            error:"could not find post for this user"
        })
    }
})
route.post('/post',auth,async (req,res)=>{
    try{
        const data=await post.create({
            post:req.body.post,
            userId:req.user.id
        })
        res.status(200).send(data)
    }
    catch(error){
        res.status(404).send({
            error:"could not create post for this user"
        })
    }
})
module.exports=route