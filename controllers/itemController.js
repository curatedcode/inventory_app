const Item = require('../models/item')
const Category = require('../models/category')
const { body, validationResult } = require('express-validator')

exports.item_list = (req, res, next) => {
  Item.find()
    .sort([["name", "ascending"]])
    .exec(function (err, results){
      if(err){
        return next(err)
      }

      res.render("item/item_index", {
        title: "All Items",
        items: results
      })
    })
}

exports.item_detail = (req, res, next) => {
  Item.findById(req.params.item_id)
    .exec(function (err, results){
      if(err){
        return next(err)
      }
      if(results == null){
        const err = new Error("Item not found")
        err.status = 404
        return next(err)
      }

      res.render("item/item_detail", {
        title: results.name,
        item: results
      })
    })
}

exports.item_create_get = (req, res, next) =>{
  Category.find()
    .exec((err, results)=>{
      if(err){
        next(err)
      }
      res.render("item/item_form", {
        title: "Create an Item",
        item: {},
        categories: results
      })
    })
}

exports.item_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must not be empty")
    .isAlphanumeric()
    .withMessage("Name must not contain non-alphanumeric characters"),
  body("price")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Price must not be empty")
    .isNumeric()
    .withMessage("Price must only contain numbers"),
  body("number_in_stock")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Number in stock must not be empty")
    .isNumeric()
    .withMessage("Number in stock must only contain numbers"),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Description must not be empty"),

  (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
      res.render("item/item_form", {
        title: "Create an Item",
        item: {
          name: res.body.name,
          category: res.body.category,
          price: res.body.price,
          number_in_stock: res.body.number_in_stock,
          description: res.body.description
        },
        errors: errors.array()
      })
    }
    if(req.body.category){
      Category.find({ name: req.body.category })
        .exec((err, results)=>{
          if(err){
            next(err)
          }
          const item = new Item({
            name: req.body.name,
            category: results._id,
            description: req.body.description,
            price: req.body.price,
            number_in_stock: req.body.number_in_stock
          })
          item.save(err =>{
            if(err){
              next(err)
            }
            res.redirect('/items')
          })
        })
    } else {
      const item = new Item({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        number_in_stock: req.body.number_in_stock
      })
      item.save(err =>{
        if(err){
          next(err)
        }
        res.redirect('/items')
      })
    }

  }
]