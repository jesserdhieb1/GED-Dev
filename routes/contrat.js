const express = require('express')
const router = express.Router()
const {createContrat} = require('../controllers/contrat')

router.route('/').post(createContrat)

module.exports=router