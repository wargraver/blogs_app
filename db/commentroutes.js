const comment = require('./db.js').comment
const post = require('./db.js').post
const user = require('./db.js').user
const route  = require('express').Router()
const auth=require('./auth.js').auth
route.get('/post/comment/:id',auth,async (req,res)=>{
    try{
        const comm=await post.findAll({
        where:{
            id:req.params.id,
        },include:comment
    })
    res.status(200).send(comm)
    }
    catch(error){
       console.log(error)
       res.send(400).status({
           error:'could not retrieve comments'
       })
    }
})

route.post('/comment/:id',auth,async (req,res)=>{
    try{
        const comm=await comment.create({
            comment:req.body.comment,
            postId:req.params.id,
            userId:req.user.id
        })
        console.log("comm",comm)
        res.status(200).send(comm)
    }
    catch(error){
       console.log(error)
       res.status(400).send({
           error:"could not add comment"
       })
    }
})
module.exports=route
