const Bureau = require('../models/bureau')
const {StatusCodes} = require("http-status-codes");
const {UnauthenticatedError} = require('../errors')


const createBureau=async (req,res)=>{
    const role = req.user.role
    console.log(role)
    if ( role==='ADMIN' || role==='PERSONNEL'){
        const bureau = await Bureau.create({...req.body});
        return res.status(StatusCodes.CREATED).json({bureau})
    }
    else {
        throw new UnauthenticatedError('Role non autorisé ')
    }
}

module.exports={createBureau}