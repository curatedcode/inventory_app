const express = require('express')
const router = express.Router()
const controller = require('../controllers/itemController')

router.get('/', controller.item_list)

router.get('/:item_id', controller.item_detail)

module.exports = router