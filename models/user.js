const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    nom:{
        type:String,
        required:[true,`svp entrez le nom de l'utilisateur`],
        maxLength:20
    },
    prenom:{
        type:String,
        required:[true,`svp entrez le prenom de l'utilisateur`],
        maxLength:20
    }
})

module.exports=mongoose.model('User',userSchema)