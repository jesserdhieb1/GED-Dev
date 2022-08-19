const User = require('../models/user')
const {StatusCodes} = require("http-status-codes");
const {UnauthenticatedError,BadRequestError,NotFoundError} = require('../errors')


const findOneUser = async (req,res)=>{
    const role = req.user.role
    if (role === 'ADMIN'){
        const userId = req.params.id
        const user  = await User.findOne({_id:userId})
        if (!user){
            throw new NotFoundError(`user n'existe pas`)
        }
        res.status(StatusCodes.OK).json({user})
    }
    else {
        throw new UnauthenticatedError('Role non autorisé ')
    }
}

const findAllUser = async (req,res)=>{
    const role = req.user.role
    if (role === 'ADMIN'){
        const users = await User.find({})
        res.status(StatusCodes.OK).json({users,nbUsers:users.length})
    }
    else {
        throw new UnauthenticatedError('Role non autorisé ')
    }
}

const deleteUser  = async (req,res)=>{
    const role = req.user.role
    if (role === 'ADMIN') {
        const userId = req.params.id
        const user = await User.findOneAndDelete({_id:userId})
        if (!user){
            throw new NotFoundError(`user n'existe pas`)
        }
        res.status(StatusCodes.OK).json({msg:"user deleted"})
    }
    else {
        throw new UnauthenticatedError('Role non autorisé ')
    }
}


const updateUser  = async (req,res)=>{
    const role = req.user.role
    if (role === 'ADMIN') {
        const userId = req.params.id
        if (req.body.password){
            throw new BadRequestError(`you can't update user password here`)
        }
        const user = await User.findOneAndUpdate({_id:userId},req.body,{runValidators:true,new:true})
        if (!user){
            throw new NotFoundError(`user n'existe pas`)
        }
        res.status(StatusCodes.OK).json({user})
    }
    else {
        throw new UnauthenticatedError('Role non autorisé ')
    }
}

module.exports= {findOneUser,findAllUser,deleteUser,updateUser}