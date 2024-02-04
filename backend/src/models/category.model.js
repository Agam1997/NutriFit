const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcategory',
    },
  ],
  // Other properties specific to categories can be added here
});

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
