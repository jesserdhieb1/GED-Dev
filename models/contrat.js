const mongoose = require('mongoose')

const contratSchema = mongoose.Schema({
    Identifiant:{// CIN / matricule fiscale / Ancien registre de commercial fiscal
        type:String,
        required: [true, `veuillez ajouter l'identifiant du contrat`],
        maxlength: 30,
        unique:true
    },
    nomContrat:{
        type:String,
        required:[true,`veuillez ajouter le nom du contrat`],
        minLength:3
    },
    nomClient:{
        type:String,
        required:[true,`veuillez ajouter le nom du client`],
        minLength:3
    },
    prenomClient:{
        type:String,
        required:[true,`veuillez ajouter le prenom du client`],
        minLength:3
    },
    numContrat:{//ou immatriculation
        type:String,
        required: [true, `veuillez ajouter le numéro du contrat`],
        maxlength: 30,
        unique:true
    },
    dateEffet:{
        type:Date,
        required: [true, `veuillez ajouter la date d'effet du contrat`],
        default:Date.now()
    },
    dateEcheance :{
        type:Date,
        required: [true, `veuillez ajouter la date d'echeance du contrat`]
    },
    typeContrat:{
        type:String,
        enum:{
            values:['ferme','a-prime-unique','renouvelable'],
            message:`{VALUE} n'exist pas`
        }
    },
    numeroTel:{
        type:Number
    },
    assurance:{
        type:String,
        required:[true,`svp ajoutez l'assurance`],
        maxlength: 30,
    },
    presenceOrganisme:{
        type:Boolean,
        default: false,
    },
    typeOperation:{
        type:String,
        enum:{
            values:['Ouverture','SousNouvAff','Avenants','Sinistre'],
            message:`{VALUE} n'exist pas dans les types de contrat`
        }
    },
    path:{
        type:String,
        required:[true,`svp ajoutez le path du fichier`],
        minlength: 3,
    },
    createdBy:{
        type:mongoose.ObjectId,
        ref:'User',
        required:[true,'please provide a user']
    },
    bureau:{
        type:mongoose.ObjectId,
        ref:'Bureau',
        required:[true,'please provide bureau']
    }
})

module.exports=mongoose.model('Contrat',contratSchema)