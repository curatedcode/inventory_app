const Category = require('../models/category')
const Item = require('../models/item')
const async = require('async')

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