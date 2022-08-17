require('dotenv').config()
const express = require('express')
const app = express()
const {StatusCodes} = require('http-status-codes')

//connection function
const connect  = require('./db/connect')
//error middlewares
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')


app.get('/',(req,res)=>{
    res.status(StatusCodes.OK).send('Hello :)')
})

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

const port = process.env.PORT || 5000
const start = async()=>{
    try{
        await connect(process.env.MONGO_URI)
        await app.listen(port,()=>{
            console.log(`Server is listening to port ${port}...`)
        })
    }
    catch (err){
        console.log(err)
    }
}
start()