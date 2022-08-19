const express = require('express')
const router = express.Router()

const {findOneUser,findAllUser,deleteUser,updateUser,resetUserPassword,changeRoleUser} = require('../controllers/user')


router.route('/reset-password').patch(resetUserPassword)
router.route('/reset-role/:id').patch(changeRoleUser)
router.route('/').get(findAllUser)
router.route('/:id').get(findOneUser).delete(deleteUser).patch(updateUser)



module.exports=router