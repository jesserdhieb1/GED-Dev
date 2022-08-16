const mongoose = require('mongoose')

const connect = (url)=>{
    console.log('Server connected with MongoDB database...')
    return mongoose.connect(url)
}

module.exports=connect