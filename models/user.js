const mongoose = require('mongoose')
const crypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,`svp entrez votre nom `],
        maxLength:20
    },
    surname:{
        type:String,
        required:[true,`svp entrez votre prenom `],
        maxLength:20
    },
    role:{
        type:String,
        required:[true,`svp entrez le role `],
        enum:{
            values:['ADMIN','PERSONNEL','ASSURANCE','BLOCKED'],
            message:`{VALUE} n'exist pas`
        },
        default:'BLOCKED'
    },
    email:{
        type:String,
        require:[true,`svp entrez votre email`],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ,'please verify your email structure'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'svp entrez votre mot de passe'],
        minLength: 6
    },
    assuranceName:{
        type:String,
        default: 'none'
    }
})

userSchema.pre(['save'],async function(){
    const salt =await crypt.genSalt(10)
    this.password= await crypt.hash(this.password,salt)
})

userSchema.methods.createJWT = function (){
    const token = jwt.sign({userId:this._id,role:this.role,name:this.name},process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME})
    return token
}

userSchema.methods.comparePassword =async function (pass){
    const isMatch= await crypt.compare(pass,this.password)
    return isMatch
}
module.exports=mongoose.model('User',userSchema)