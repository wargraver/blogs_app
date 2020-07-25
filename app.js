const express=require('express')
const app = express()
const path=require('path')
const route1=require('./db/userroutes.js')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(route1)
app.get('/',(req,res)=>{
   res.status(200).send("hello")
})
app.listen(3000,()=>{
   console.log('server is deployed on prt 3000')
})