const user=require('./db.js').user
const post=require('./db.js').post
const token=require('./db.js').token
const route=require('express').Router()
const jwt=require('jsonwebtoken')
const auth=require('./auth.js').auth
const bcrypt=require('bcrypt')
route.get('/user',auth,async (req,res)=>{
    try{
        var data=await user.findAll({
            include:[post,token]
        })
        res.status(200).send(data)
    }
    catch(error){
        res.status(404).send({
            error:"could not find users"
        })
    }
})
route.get('/user/:id',auth,async (req,res)=>{
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
route.post('/user/signup',async(req,res)=>{
    try{
        const str=req.body.password
        console.log(str)
        const hashed=await bcrypt.hash(str,8)
        console.log(hashed)
        const data=await user.create({
            name:req.body.name,
            password:hashed
        })
        res.status(200).send(data)
    }
    catch(error){
        res.status(404).send({
            error:"could not create new user"
        })
    }
})
route.post('/user/login',async(req,res)=>{
    try{
    const str=req.body.password
    const user_data=await user.findAll({
        where:{
            name:req.body.name
        },include:token
    })
    if(!user_data[0]) res.status(400).send({
        error:"NO such user exist"
    })
    else{
        //console.log(user_data)
       // console.log(user_data[0].password)
        const val2=await bcrypt.compare(str,user_data[0].password)
        if(val2){
            const str2=user_data[0].id
            const arr=user_data[0].tokens
            const tok2=jwt.sign(str2.toString(),'12345')
            arr.push(tok2)
           // console.log(tok2)
            const new_tok = await token.create({
                tok:tok2,
                userId:user_data[0].id
            })
           // console.log("user",user_data)
           // console.log("token",new_tok)
            const data=await user.findAll({where:{
                id:user_data[0].id
            },include:token})
          //  console.log("data",data)
            res.status(200).send({data,tok2})
        }
        else res.status(400).send("invalid credintials")
    }
    }
    catch(error){
        console.log(error)
        console.log('error to login')
    }
})
module.exports=route