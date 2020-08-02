const Sequelize=require('sequelize')
const db=new Sequelize('social_media','root','...........',{
    hostname:'localhost',
    dialect:'mysql'
})
async function check(){
    try{
        await db.authenticate()
        console.log("connected to db")
    }
    catch(error){
        console.error("can not connect to db")
    }
}
check()
adid={
    type:Sequelize.DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
}
const user=db.define('user',{
    id:adid,
    name:{
        type:Sequelize.DataTypes.STRING(30),
        allowNull:false,
    },
    password:{
        type:Sequelize.DataTypes.STRING(200),
        allowNull:false,
    }
})
const token=db.define('token',{
    id:adid,
    tok:{
        type:Sequelize.DataTypes.STRING(200)
    }
})
const post=db.define('post',{
    id:adid,
    post:{
        type:Sequelize.DataTypes.TEXT,
        allowNull:false
    }
})
const comment=db.define('comment',{
    id:adid,
    comment:{
        type:Sequelize.DataTypes.STRING(200)
    }
})
user.hasMany(post)
post.belongsTo(user,{
    foreignKey:{
        allowNull:false
    }
})
user.hasMany(token)
token.belongsTo(user,{
    foreignKey:{
        allowNull:false
    }
})
user.hasMany(comment)
comment.belongsTo(user,{
    foreignKey:{
        allowNull:false
    }
})

post.hasMany(comment)
comment.belongsTo(post)
 
db.sync({force:true})
.then(()=>{
     console.log("created db")
})
.catch((error)=>{
     console.log(error)
})
module.exports={
    user,comment,post,token
}
