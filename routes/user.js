const express = require('express')
const router = express.Router()

const {findOneUser,findAllUser} = require('../controllers/user')


router.route('/').get(findAllUser)
router.route('/:id').get(findOneUser)



module.exports=router