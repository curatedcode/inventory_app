var express = require('express');
const Category = require('../models/category');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Category.find()
    .sort([["name", "ascending"]])
    .exec(function(err, results){
      if(err){
        return next(err)
      }

      res.render("index", {
        title: "Inventory Management",
        categories: results
      })
    })
});

module.exports = router;
