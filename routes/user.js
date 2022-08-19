const express = require('express')
const router = express.Router()

const {findOneUser} = require('../controllers/user')


router.route('/:id').get(findOneUser)



module.exports=router