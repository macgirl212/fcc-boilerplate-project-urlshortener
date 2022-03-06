const express = require('express')
const router = express.Router()

const { postOrFindUrl, goToUrl } = require('../controllers/urls')

router.route('/').post(postOrFindUrl)
router.route('/:id').get(goToUrl)

module.exports = router