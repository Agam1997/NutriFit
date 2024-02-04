const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  calories: {
    type: Number,
    required: true,
  },
  recipe: {
    type: String,
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: String, // or Number, depending on your use case
      },
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

// add plugin that converts mongoose to json
foodSchema.plugin(toJSON);
foodSchema.plugin(paginate);

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
