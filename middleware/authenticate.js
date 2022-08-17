const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')
require('dotenv').config()

const authenticate  = async (req,res,next)=>{
    const authHeader = req.header.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('non autorisé veuillez réessayer une autre fois')
    }
    const token = authHeader.split(' ')[1]
    try{
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)
        req.user={userId:decoded.userId,role:decoded.role,name:decoded.name}
        return next()
    }
    catch (err){
        throw new UnauthenticatedError('non autorisé veuillez réessayer une autre fois')
    }
}

module.exports=authenticate