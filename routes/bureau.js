const express = require('express')
const router = express.Router()
const {createBureau,deleteBureau,updateBureau} = require('../controllers/bureau')

router.route('/').post(createBureau)
router.route('/:id').delete(deleteBureau).patch(updateBureau)


module.exports=router