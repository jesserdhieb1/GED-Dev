const express = require('express')
const router = express.Router()
const {createContrat,findOneContrat,findAllContrat,updateContrat} = require('../controllers/contrat')

router.route('/').post(createContrat).get(findAllContrat)
router.route('/:id').get(findOneContrat).patch(updateContrat)

module.exports=router