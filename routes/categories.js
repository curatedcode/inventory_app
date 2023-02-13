const express = require('express')
const router = express.Router()
const controller = require('../controllers/categoryController')

router.get("/", controller.category_list)

router.get("/:category_id/", controller.category_detail)

module.exports = router