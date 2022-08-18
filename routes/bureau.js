const express = require('express')
const router = express.Router()
const {createBureau,deleteBureau} = require('../controllers/bureau')

router.route('/').post(createBureau)
router.route('/:id').delete(deleteBureau)


module.exports=router