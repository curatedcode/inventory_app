const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
  name: String,
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true 
  },
  description: {
    type: String,
    length: { min: 1 }
  },
  price: Number,
  number_in_stock: Number
})

ItemSchema.virtual("url").get(function(){
  return `/items/${this._id}`
})

module.exports = mongoose.model("Item", ItemSchema)