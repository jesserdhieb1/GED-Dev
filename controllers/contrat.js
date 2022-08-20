const Contrat = require('../models/contrat')
const Bureau = require('../models/bureau')
const {StatusCodes} = require("http-status-codes");
const {UnauthenticatedError,BadRequestError,NotFoundError} = require('../errors')

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


module.exports={createContrat}