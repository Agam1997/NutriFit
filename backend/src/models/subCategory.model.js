const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  // Other properties specific to subcategories can be added here
});

// add plugin that converts mongoose to json
subcategorySchema.plugin(toJSON);
subcategorySchema.plugin(paginate);

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
