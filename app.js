require('dotenv').config()
require('express-async-errors');
//security
const rateLimit  =require('express-rate-limit')
const helmet = require('helmet')
const cors =require('cors')
const xss = require('xss-clean')
//swagger
const SwaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')

const express = require('express')
const app = express()

//middlewares
const {StatusCodes} = require('http-status-codes')
const authenticateMiddleware = require('./middleware/authenticate')
const fileUpload = require("express-fileupload");
//routes
const authRoutes = require('./routes/authentification')
const bureauRoutes = require('./routes/bureau')
const userRoutes = require('./routes/user')
const contratRouter = require('./routes/contrat')
//connection function
const connect  = require('./db/connect')
//error middlewares
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
//security
app.set('trust proxy', 1);
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
}))
app.use(helmet())
app.use(cors())
app.use(xss())

app.use(express.json());
app.use(fileUpload());

app.get('/',(req,res)=>{
    res.status(StatusCodes.OK).send('<h1>GED APIs</h1> <a href="/api-docs">Documentation</a>')
})
app.use('/api-docs',SwaggerUI.serve,SwaggerUI.setup(swaggerDocument))

//routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/bureau',authenticateMiddleware,bureauRoutes)
app.use('/api/v1/user',authenticateMiddleware,userRoutes)
app.use('/api/v1/contrat',authenticateMiddleware,contratRouter)

app.use(errorHandlerMiddleware)
// app.use(notFoundMiddleware)

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