require('dotenv').config()
const express = require('express')
const app = express()
const connect  = require('./db/connect')
const {StatusCode} = require('http-status-codes')


app.get('/',(req,res)=>{
    res.status(StatusCode.OK).send('Hello :)')
})



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