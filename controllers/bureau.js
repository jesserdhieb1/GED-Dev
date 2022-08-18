const Bureau = require('../models/bureau')
const {StatusCodes} = require("http-status-codes");
const {UnauthenticatedError,BadRequestError,NotFoundError} = require('../errors')


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
            throw new BadRequestError('id de bureau incorrecte ')
        }
        res.status(StatusCodes.OK).json({msg:'bureau supprimé'})
    }
    else {
        throw new UnauthenticatedError('Role non autorisé ')
    }
}

module.exports={createBureau,deleteBureau}