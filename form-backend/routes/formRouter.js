const controller = require('../controllers/formController')
const express = require('express')
const router = express.Router()

router.post('/saveForm', controller.saveForm);

module.exports = router