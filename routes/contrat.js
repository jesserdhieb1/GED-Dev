const express = require('express')
const router = express.Router()
const {createContrat,findOneContrat,findAllContrat,updateContrat,deleteContrat,downloadContrat} = require('../controllers/contrat')

router.route('/').post(createContrat).get(findAllContrat)
router.route('/download/:id').get(downloadContrat)
router.route('/:id').get(findOneContrat).patch(updateContrat).delete(deleteContrat)

module.exports=router