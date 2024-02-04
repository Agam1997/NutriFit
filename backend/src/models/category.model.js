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

// Function to check if a category with a given name already exists
categorySchema.statics.isNameTaken = async function (name, excludeCategoryID) {
  const category = await this.findOne({ name, _id: { $ne: excludeCategoryID } });
  return !!category;
};

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
