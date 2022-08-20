const express = require('express')
const router = express.Router()
const {createContrat,findOneContrat} = require('../controllers/contrat')

router.route('/').post(createContrat)
router.route('/:id').get(findOneContrat)

module.exports=router