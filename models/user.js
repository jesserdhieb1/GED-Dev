const mongoose = require('mongoose')

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

module.exports=mongoose.model('User',userSchema)