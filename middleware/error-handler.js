const {StatusCodes} = require('http-status-codes')
const { CustomAPIError } = require('../errors')

const errorHandlerMiddleware = (req,res,err,next)=>{
    //to remove in production phase
    console.log('tesst')
    if (err instanceof CustomAPIError) {
      return res.status(err.statusCode).json({ msg: err.message })
    }
    let CustomError = {
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message:err.message || 'Something went wrong, try again later'
    }
    if (err.name==='ValidationError'){
        CustomError.message=Object.values(err.errors)
            .map((item)=>item.message).join(', ')
        CustomError.statusCode=StatusCodes.BAD_REQUEST
    }
    if (err.code && err.status === 11000){
        CustomError.message=`Duplicate value entered for ${Object.keys(err.keyValue)} please choose another value`
        CustomError.statusCode=StatusCodes.BAD_REQUEST
    }
    if (err.name==='CastError'){
        CustomError.message=`No item found with the id :  ${err.value} `
        CustomError.statusCode=StatusCodes.NOT_FOUND
    }
    return res.status(CustomError.statusCode).json({msg:CustomError.message})
}

module.exports=errorHandlerMiddleware