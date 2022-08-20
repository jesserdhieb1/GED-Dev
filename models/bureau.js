const mongoose = require('mongoose')


const bureauSchema = mongoose.Schema({
    nomBureau:{
        type:String,
        required:[true,`svp entrez le nom de bureau`],
        maxLength:20,
        unique:true
    },
    adresse:{
        type:String,
        required:[true,`svp entrez l'adresse du bureau`],
        maxLength:50,
        unique: true
    }
})

module.exports=mongoose.model('Bureau',bureauSchema)