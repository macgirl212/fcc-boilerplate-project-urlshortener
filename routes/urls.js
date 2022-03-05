const express = require('express')
const router = express.Router()

const { postNewUrl } = require('../controllers/urls')

router.route('/').post(postNewUrl)

module.exports = router