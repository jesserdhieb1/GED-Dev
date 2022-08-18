const Bureau = require('../models/bureau')
const {StatusCodes} = require("http-status-codes");
const {UnauthenticatedError,BadRequestError,NotFoundError} = require('../errors')

const findAllBureau =async (req,res)=>{
    const bureaux =await Bureau.find({})
    res.status(StatusCodes.OK).json({bureaux,nbBureaux:bureaux.length})
}

const createBureau=async (req,res)=>{
    const role = req.user.role
    if ( role==='ADMIN' || role==='PERSONNEL'){
        const bureau = await Bureau.create({...req.body});
        return res.status(StatusCodes.CREATED).json({bureau})
    }
    else {
        throw new UnauthenticatedError('Role non autorisé ')
    }
}

const deleteBureau=async (req,res)=>{
    const role = req.user.role
    if ( role==='ADMIN' ){
        const bureauId = req.params.id
        const bureau = await Bureau.findOneAndRemove({_id:bureauId})
        if (!bureau){
            throw new NotFoundError('id de bureau incorrecte ')
        }
        res.status(StatusCodes.OK).json({msg:'bureau supprimé'})
    }
    else {
        throw new UnauthenticatedError('Role non autorisé ')
    }
}

const updateBureau=async (req,res)=>{
    const role = req.user.role
    if ( role==='ADMIN' ){
        const bureauId = req.params.id
        const {nomBureau,adresse} = req.body
        if (!nomBureau || !adresse){
            throw new BadRequestError('nom ou adresse bureau manquant ')
        }
        const bureau = await Bureau.findOneAndUpdate({_id:bureauId},req.body,{runValidators:true,new:true})
        if (!bureau){
            throw new NotFoundError('id de bureau incorrecte ')
        }
        res.status(StatusCodes.OK).json({bureau})
    }
    else {
        throw new UnauthenticatedError('Role non autorisé ')
    }
}

module.exports={createBureau,deleteBureau,updateBureau,findAllBureau}