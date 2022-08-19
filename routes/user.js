const express = require('express')
const router = express.Router()

const {findOneUser,findAllUser,deleteUser,updateUser,resetUserPassword} = require('../controllers/user')


router.route('/').get(findAllUser).patch(resetUserPassword)
router.route('/:id').get(findOneUser).delete(deleteUser).patch(updateUser)



module.exports=router