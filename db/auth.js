const user=require('./db.js').user
const token =require('./db.js').token
const jwt=require('jsonwebtoken')
const auth =async (req,res,next)=>{
    try{
      const token2 = req.header('Authorization')
      console.log(req.header('Authorization'))
      const str=token2.replace('Bearer ','')
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