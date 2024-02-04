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
});

// add plugin that converts mongoose to json
subcategorySchema.plugin(toJSON);
subcategorySchema.plugin(paginate);

// Function to check if a subcategory with a given name already exists within a parent category
subcategorySchema.statics.isNameTaken = async function (name, parentCategoryID, excludeSubcategoryID) {
  const subcategory = await this.findOne({
    name,
    parentCategory: parentCategoryID,
    _id: { $ne: excludeSubcategoryID },
  });
  return !!subcategory;
};

const Subcategory = mongoose.model('Subcategory', subcategorySchema);

module.exports = Subcategory;
