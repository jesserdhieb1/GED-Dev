const mongoose = require('mongoose')

const  assuranceSchema = mongoose.Schema({
    nomAssurance:{
        type:String,
        required:[true,`svp entrez le nom de l'assurance`],
        maxLength:20
    }
})

module.exports=mongoose.model('Assurance',assuranceSchema)