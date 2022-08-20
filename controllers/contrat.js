const Contrat = require('../models/contrat')
const Bureau = require('../models/bureau')
const User = require('../models/user')
const {StatusCodes} = require("http-status-codes");
const {UnauthenticatedError,BadRequestError,NotFoundError} = require('../errors')


const findAllContrat = async (req,res)=>{
    const role = req.user.role
    if ( role==='ADMIN' || role==='PERSONNEL' || role==='ASSURANCE'){
        if ( role==='ASSURANCE'){
            const user =await User.findOne({_id:req.user.userId})
            const contrats = await Contrat.find({assurance:user.assuranceName})
            res.status(StatusCodes.OK).json({contrats,nb:contrats.length})
        }
        const contrats = await Contrat.find({})
        res.status(StatusCodes.OK).json({contrats,nb:contrats.length})
    }
    else {
        throw new UnauthenticatedError('Role non autorisé ')
    }
}


const findOneContrat = async (req,res)=>{
    const role = req.user.role
    if ( role==='ADMIN' || role==='PERSONNEL' || role==='ASSURANCE'){
        const ContratId = req.params.id
        if ( role==='ASSURANCE'){
            const user =await User.findOne({_id:req.user.userId})
            const contrat = await Contrat.findOne({_id:ContratId,assurance:user.assuranceName})
            if (!contrat){
                throw new NotFoundError(`le contrat n'existe pas `)
            }
            res.status(StatusCodes.OK).json({contrat})
        }
        const contrat = await Contrat.findOne({_id:ContratId})
        if (!contrat){
            throw new NotFoundError(`le contrat n'existe pas `)
        }
        res.status(StatusCodes.OK).json({contrat})
    }
    else {
        throw new UnauthenticatedError('Role non autorisé ')
    }
}

const createContrat = async (req,res)=>{
    const role = req.user.role
    if ( role==='ADMIN' || role==='PERSONNEL'){
        req.body.createdBy=req.user.userId
        if (!req.body.bureauName){
            throw new BadRequestError('veuillez introduire le nom du bureau ')
        }
        const bureau = await Bureau.findOne({nomBureau:req.body.bureauName})
        if (!bureau){
            throw new NotFoundError('nom de bureau incorrecte ')
        }
        req.body.bureau=bureau._id
        const contrat = await Contrat.create({...req.body})
        res.status(StatusCodes.CREATED).json({contrat})
    }
    else {
        throw new UnauthenticatedError('Role non autorisé ')
    }
}

const updateContrat = async (req,res)=>{
    const role = req.user.role
    if ( role==='ADMIN' || role==='PERSONNEL'){
        const ContratId = req.params.id
        const contrat = await Contrat.findOneAndUpdate({_id:ContratId},req.body,{runValidators:true,new:true})
        if (!contrat){
            throw new NotFoundError(`le contrat n'existe pas `)
        }
        res.status(StatusCodes.OK).json({contrat})
    }
    else {
        throw new UnauthenticatedError('Role non autorisé ')
    }
}

const deleteContrat =async (req,res)=>{
    const role = req.user.role
    if ( role==='ADMIN' || role==='PERSONNEL'){
        const ContratId = req.params.id
        const contrat = await Contrat.findOneAndDelete({_id:ContratId})
        if (!contrat){
            throw new NotFoundError(`le contrat n'existe pas `)
        }
        res.status(StatusCodes.OK).json({msg:"contrat effacé"})
    }
    else {
        throw new UnauthenticatedError('Role non autorisé ')
    }
}


module.exports={createContrat,findOneContrat,findAllContrat,updateContrat,deleteContrat}