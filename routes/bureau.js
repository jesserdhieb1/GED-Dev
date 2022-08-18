const express = require('express')
const router = express.Router()
const {createBureau} = require('../controllers/bureau')

router.route('/').post(createBureau)


module.exports=router