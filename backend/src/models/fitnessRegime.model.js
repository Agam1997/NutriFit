const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const fitnessRegimeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: mongoose.Schema.Types.String,
    },
    description: {
      type: mongoose.Schema.Types.String,
    },
    duration: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0.0,
    },
    caloriesBurned: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0.0,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
fitnessRegimeSchema.plugin(toJSON);
fitnessRegimeSchema.plugin(paginate);

/**
 * @typedef FitnessRegime
 */
const FitnessRegime = mongoose.model('FitnessRegime', fitnessRegimeSchema);

module.exports = FitnessRegime;
