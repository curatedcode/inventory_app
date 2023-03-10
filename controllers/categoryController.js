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
  res.render("category/category_form", {
    title: "Create a Category",
    category: {
      name: ''
    }
  })
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
        category: {
          name: req.body.name
        },
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

exports.category_update_get = (req, res, next)=>{
  Category.findById(req.params.category_id)
    .exec((err, result)=>{
      if(err){
        return next(err)
      }
      res.render("category/category_form", {
        title: "Update a Category",
        category: result
      })
    })
}

exports.category_update_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified")
    .isAlphanumeric()
    .withMessage("Name must not have non-alphanumeric characters"),
  (req, res, next)=>{
    const errors = validationResult(req)

    if(!errors.isEmpty()){
      res.render("category/category_form", {
        title: "Update a Category",
        category: req.params.category_id,
        errors: errors.array()
      })
    }

    const category = new Category({
      _id: req.params.category_id,
      name: req.body.name
    })

    Category.findByIdAndUpdate(req.params.category_id, category, {}, (err, category)=>{
      if(err){
        return next(err)
      }
      res.redirect(category.url)
    })
  }
]

exports.category_delete_get = (req, res, next)=>{
  async.parallel(
    {
      category(callback){
        Category.findById(req.params.category_id)
          .exec(callback)
      },
      items(callback){
        Item.find({ category: req.params.category_id })
          .exec(callback)
      }
    },
    (err, results)=>{
      if(err){
        return next(err)
      }

      res.render("category/category_delete", {
        title: "Delete Category",
        category: results.category,
        items: results.items
      })
    }
  )
}

exports.category_delete_post = (req, res, next)=>{
  if(req.body.items.length > 0){
    const error = "Please delete the items in this category before proceeding"
    error.status = 404
    return next(error)
  }
  Category.findByIdAndDelete(req.params.category_id)
    .exec(err => {
      if(err){
        return next(err)
      }
      res.redirect('/categories')
    })
}