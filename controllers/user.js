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


module.exports= {findOneUser}