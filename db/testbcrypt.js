const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
let str='utkarsh'
const token=function(){
    const token2=jwt.sign('1','mypassword')
    console.log(token2)
}
token()
const hash=async function(data){
    const hash_pass=await bcrypt.hash(data,8)
    console.log(str)
    console.log(hash_pass)
    return hash_pass
}
const match=async function(data,hashed){
    const val=await bcrypt.compare(data,hashed)
    console.log(val)
}
hash(str).then((pass)=>match(str,pass))
