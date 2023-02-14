const Category = require('../models/category')
const Item = require('../models/item')
const async = require('async')
const { body, validationResult } = require('express-validator')

exports.category_list = (req, res, next)=>{
  Category.find()
    .sort([["name", "ascending"]])
    .exec(function (err, result){
      if(err){
        return next(err)
      }

      res.render("category/category_index", {
        title: "Category List",
        categories: result
      })
    })
}

exports.category_detail = (req, res, next)=>{

  async.parallel(
    {
      category(callback){
        Category.findById(req.params.category_id)
          .exec(callback)
      },
      categoryList(callback){
        Item.find({ category: req.params.category_id })
          .exec(callback)
      },
    },
    (err, results)=>{
      if(err){
        return next(err)
      }
      if(results == null){
        res.redirect("/categories")
      }

      res.render("category/category_detail", {
       title: "Category Detail",
       category: results.category,
       items: results.categoryList
      })
    }
  )
}

exports.category_create_get = (req, res, next)=>{
  res.render("category/category_form", { title: "Create a Category"})
}

exports.category_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified")
    .isAlphanumeric()
    .withMessage("Name must not have non-alphanumeric characters"),

  (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      res.render("category/category_form",{
        title: "Create a Category",
        name: req.body.name,
        errors: errors.array()
      })
    }

    const category = new Category({
      name: req.body.name
    })
    category.save(err => {
      if(err){
        return next(err)
      }
      res.redirect("/categories")
    })
  }
]