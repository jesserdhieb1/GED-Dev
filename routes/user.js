const express = require('express')
const router = express.Router()

const {findOneUser,findAllUser,deleteUser,updateUser} = require('../controllers/user')


router.route('/').get(findAllUser)
router.route('/:id').get(findOneUser).delete(deleteUser).patch(updateUser)



module.exports=router