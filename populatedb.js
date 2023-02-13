#! /usr/bin/env node

console.log('This script populates some categories and items');

const async = require('async')
const Category = require('./models/category')
const Item = require('./models/item')


const mongoose = require('mongoose');
const Mongo_URL = require('./Mongo_URL');
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(Mongo_URL);
}

const categories = []
const items = []

function categoryCreate(category_name, cb) {
  categoryDetail = {
    name: category_name,
  }
  
  const category = new Category(categoryDetail);
       
  category.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category)
  }  );
}

function itemCreate(name, category, description, price, number_in_stock, cb) {
  const item = new Item({
    name: name,
    category: category,
    description: description,
    price: price,
    number_in_stock: number_in_stock
  });
       
  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Item: ' + item);
    items.push(item)
    cb(null, item);
  }   );
}


function createCategories(cb) {
    async.series([
        function(callback) {
          categoryCreate('Dairy', callback);
        },
        function(callback) {
          categoryCreate('Meat', callback);
        },
        function(callback) {
          categoryCreate('Beverage', callback);
        },
        ],
        // optional callback
        cb);
}


function createItems(cb) {
    async.parallel([
        function(callback) {
          itemCreate(
            'Sharp Cheddar Cheese',
            categories[0],
            'A sharp cheddar packed full of flavor which is also healthy for you.',
            3.45,
            4,
            callback
          )
        },
        function(callback) {
          itemCreate(
            'Whole Milk',
            categories[0],
            'A great choice for any milk connoisseur.',
            6.80,
            11,
            callback
          )
        },
        function(callback) {
          itemCreate(
            'Ground Beef (10lb)',
            categories[1],
            'An 80/20 ground beef that can be used for anything from tacos to shepard\'s pie.',
            22.13,
            8,
            callback
          )
        },
        function(callback) {
          itemCreate(
            'New York Strip',
            categories[1],
            'A great cut of steak which is always sure to please your taste buds.',
            22.89,
            0,
            callback
          )
        },
        function(callback) {
          itemCreate(
            'Whole Chicken (10lb)',
            categories[1],
            'A whole chicken which can be cut up into its individual parts or cooked whole for any occasion.',
            15.30,
            13,
            callback
          )
        },
        function(callback) {
          itemCreate(
            'Case of Water',
            categories[2],
            'A case of water with 18 individual 12fl-oz bottles.',
            5.66,
            6,
            callback
          )
        },
        function(callback) {
          itemCreate(
            'Water Bottle 12fl oz',
            categories[2],
            'A crisp tasting water captured from below the ice of Antarctica.',
            1.23,
            32,
            callback
          )
        },
        function(callback) {
          itemCreate(
            'Orange Juice 12fl oz',
            categories[2],
            'A bold tasting orange juice squeezed from fresh oranges.',
            3.45,
            12,
            callback
          )
        },
        function(callback) {
          itemCreate(
            'Orange Juice 32fl oz',
            categories[2],
            'A bold tasting orange juice squeezed from fresh oranges.',
            5.68,
            7,
            callback
          )
        },
        function(callback) {
          itemCreate(
            'Apple Juice 32fl oz',
            categories[2],
            'A bold tasting apple juice squeezed from fresh apples.',
            5.68,
            7,
            callback
          )
        },
        function(callback) {
          itemCreate(
            'Apple Juice 12fl oz',
            categories[2],
            'A bold tasting apple juice squeezed from fresh apples.',
            3.45,
            12,
            callback
          )
        },
        function(callback) {
          itemCreate(
            'Pepsi 12fl oz',
            categories[2],
            'A crisp tasting drink you can carry with you anywhere.',
            3.45,
            8,
            callback
          )
        },
        function(callback) {
          itemCreate(
            'Pepsi 12-count',
            categories[2],
            'A pack of crisp tasting drinks you can carry with you anywhere.',
            12.43,
            5,
            callback
          )
        },
        function(callback) {
          itemCreate(
            'Coke 12fl oz',
            categories[2],
            'A crisp tasting drink you can carry with you anywhere.',
            3.45,
            8,
            callback
          )
        },
        function(callback) {
          itemCreate(
            'Coke 12-count',
            categories[2],
            'A pack of crisp tasting drinks you can carry with you anywhere.',
            12.43,
            5,
            callback
          )
        },
        ],
        // optional callback
        cb);
}

async.series([
    createCategories,
    createItems
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    } else {
      console.log('Results: '+ results)
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




