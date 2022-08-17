const mongoose = require('mongoose')
const {model} = require("mongoose");

const bureauSchema = mongoose.Schema({
    nomBureau:{
        type:String,
        required:[true,`svp entrez le nom de bureau`],
        maxLength:20
    },
    adresse:{
        type:String,
        required:[true,`svp entrez l'adresse du bureau`],
        maxLength:50
    }
})

model.exports=mongoose.model('Bureau',bureauSchema)