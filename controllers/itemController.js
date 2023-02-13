const Item = require('../models/item')

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