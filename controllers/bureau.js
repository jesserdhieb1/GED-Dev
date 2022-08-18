const Bureau = require('../models/bureau')
const {StatusCodes} = require("http-status-codes");


const createBureau=async (req,res)=>{
    const bureau = await Bureau.create({...req.body});
    return res.status(StatusCodes.CREATED).json({bureau})
}

module.exports={createBureau}