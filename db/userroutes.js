const user=require('./db.js').user
const route=require('express').Router()
route.get('/user',async (req,res)=>{
    try{
        console.log('hello')
        var data=await user.findAll()
        res.status(200).send(data)
    }
    catch(error){
        res.status(404).send({
            error:"could not find users"
        })
    }
})
route.get('/user/:id',async (req,res)=>{
    try{
       var data=await user.findAll({where:{
            id:req.params.id
        }
    }) 
     res.status(200).send(data)
    }
    catch(error){
        res.status(404).send({
            error:"could not find user"
        })
    }
})
route.post('/user',async(req,res)=>{
    try{
        const data=await user.create({
            name:req.body.name
        })
        res.status(200).send(data)
    }
    catch(error){
        res.status(404).sned({
            error:"could not create new user"
        })
    }
})
module.exports=route