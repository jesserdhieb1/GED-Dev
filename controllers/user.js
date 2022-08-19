const User = require('../models/user')
const {StatusCodes} = require("http-status-codes");
const {UnauthenticatedError,BadRequestError,NotFoundError} = require('../errors')
const crypt = require('bcryptjs')

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

const resetUserPassword  = async (req,res)=>{
    const userId = req.user.userId
    const user  = await User.findOne({_id:userId})
    const {oldPassword,newPassword} = req.body
    if (oldPassword==='' || newPassword===''){
        throw new BadRequestError('One or both of the passwords are missing')
    }
    const isMatch =await user.comparePassword(oldPassword)
    if (isMatch){
        const salt =await crypt.genSalt(10)
        const password = await crypt.hash(newPassword,salt)
        const newUser = await User.findOneAndUpdate({_id:userId},{password},{runValidators:true,new:true})
        res.status(StatusCodes.OK).json({newUser})
    }
    else {
        throw new UnauthenticatedError('please verify your password')
    }
}

const changeRoleUser = async (req,res)=>{
    const role = req.user.role
    if (role === 'ADMIN') {
        const userId = req.params.id
        const newRole = req.body.role
        if (!newRole){
            throw new BadRequestError('New role is missing')
        }
        const user = await User.findOneAndUpdate({_id:userId},{role:newRole},{runValidators:true,new:true})
        if (!user){
            throw new NotFoundError(`user n'existe pas`)
        }
        res.status(StatusCodes.OK).json({user})
    }
    else {
        throw new UnauthenticatedError('Role non autorisé ')
    }
}

module.exports= {findOneUser,findAllUser,deleteUser,updateUser,resetUserPassword,changeRoleUser}