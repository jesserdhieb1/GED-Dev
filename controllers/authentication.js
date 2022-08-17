const {StatusCodes} = require('http-status-codes')
const User  =require('../models/user')
const {BadRequestError,UnauthenticatedError} = require('../errors/index')

const register = async (req,res)=>{
    const user =await User.create({...req.body})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name:user.name},token})
}

const login = async (req,res)=>{
    const {email,password} = req.body
    if (!email || !password){
        throw new BadRequestError('please provide both your email and password')
    }
    const user = await User.findOne({email:email})
    const isCorrect = await user.comparePassword(password)
    if (!isCorrect || !user){
        throw new UnauthenticatedError('please verify your credentials')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{name:user.name},token})
}

module.exports={register,login}