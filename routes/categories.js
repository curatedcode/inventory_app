const express = require('express')
const router = express.Router()
const controller = require('../controllers/categoryController')

router.get("/", controller.category_list)

router.get("/create", controller.category_create_get)
router.post("/create", controller.category_create_post)

router.get("/:category_id/", controller.category_detail)

router.get("/:category_id/update", controller.category_update_get)
router.post("/:category_id/update", controller.category_update_post)

router.get("/:category_id/delete", controller.category_delete_get)
router.post("/:category_id/delete", controller.category_delete_post)

module.exports = router