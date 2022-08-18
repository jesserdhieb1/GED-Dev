const express = require('express')
const router = express.Router()
const {createBureau,deleteBureau,updateBureau,findAllBureau,findOneBureau} = require('../controllers/bureau')

router.route('/').post(createBureau).get(findAllBureau)
router.route('/:id').delete(deleteBureau).patch(updateBureau).get(findOneBureau)


module.exports=router