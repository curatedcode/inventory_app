const express = require('express')
const router = express.Router()
const controller = require('../controllers/itemController')

router.get('/', controller.item_list)

router.get('/create', controller.item_create_get)
router.post('/create', controller.item_create_post)

router.get('/:item_id', controller.item_detail)

router.get('/:item_id/update', controller.item_update_get)
router.post('/:item_id/update', controller.item_update_post)

router.get('/:item_id/delete', controller.item_delete_get)
router.post('/:item_id/delete', controller.item_delete_post)

module.exports = router