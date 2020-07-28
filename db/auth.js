const user=require('./db.js').user
const token =require('./db.js').token
const jwt=require('jsonwebtoken')
const auth =async (req,res,next)=>{
    try{
     // const str = req.params.tok
     // console.log(req.parms.tok)
      //console.log(req.query.tok)
      let str=2
      console.log(req.body.tok)
      console.log(req.body.post)
      console.log(req.query.tok)
      if(req.query.tok===undefined) str=req.body.tok
      else str=req.query.tok
     // console.log(req.header('Authorization'))
    //  const str=token2.replace('Bearer ','')
      const decode  = jwt.verify(str,'12345')
      console.log("decode",decode)
      const user_new=await user.findAll({where:{
          id:decode
      },include:token})
      console.log(str)
      req.user=user_new[0]
      next()
    }
      catch(error){
          console.log(error)
          res.send({
              error:'something went wrong'
          })
      }
}  
module.exports={
    auth
}