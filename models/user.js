const mongoose = require('mongoose')
const crypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const userSchema = mongoose.Schema({
    nom:{
        type:String,
        required:[true,`svp entrez votre nom `],
        maxLength:20
    },
    prenom:{
        type:String,
        required:[true,`svp entrez votre prenom `],
        maxLength:20
    },
    role:{
        type:String,
        enum:{
            values:['ADMIN','PERSONNEL','ASSURANCE'],
            message:`{VALUE} n'exist pas`
        }
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
        required:[true,'please entrez votre mot de passe'],
        minLength: 6
    }
})

userSchema.pre('save',async function(){
    const salt = crypt.genSalt(10)
    this.password= await crypt.hash(this.password,salt)
})

userSchema.methods.createJWT = function (){
    const token = jwt.sign({userId:this._id,role:this.role,nom:this.nom},process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME})
    return token
}

userSchema.methods.comparePassword =async function (pass){
    const isMatch= await crypt.compare(pass,this.password)
    return isMatch
}
module.exports=mongoose.model('User',userSchema)