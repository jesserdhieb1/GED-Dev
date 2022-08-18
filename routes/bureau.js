const express = require('express')
const router = express.Router()
const {createBureau,deleteBureau,updateBureau,findAllBureau} = require('../controllers/bureau')

router.route('/').post(createBureau).get(findAllBureau)
router.route('/:id').delete(deleteBureau).patch(updateBureau)


module.exports=router