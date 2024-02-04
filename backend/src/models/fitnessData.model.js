const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const historicalRecordSchema = new mongoose.Schema({
  value: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0.0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const fitnessDataSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bmi: {
      current: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0,
      },
      history: [historicalRecordSchema],
    },
    fatPercentage: {
      current: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0,
      },
      history: [historicalRecordSchema],
    },
    progress: {
      current: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0,
      },
      history: [historicalRecordSchema],
    },
    weight: {
      current: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0,
      },
      history: [historicalRecordSchema],
    },
    height: {
      type: mongoose.Schema.Types.Decimal128,
      default: 0.0,
    },
    neck: {
      current: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0,
      },
      history: [historicalRecordSchema],
    },
    rightBicep: {
      current: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0,
      },
      history: [historicalRecordSchema],
    },
    leftBicep: {
      current: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0,
      },
      history: [historicalRecordSchema],
    },
    chest: {
      current: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0,
      },
      history: [historicalRecordSchema],
    },
    upperAbdomen: {
      current: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0,
      },
      history: [historicalRecordSchema],
    },
    abdomen: {
      current: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0,
      },
      history: [historicalRecordSchema],
    },
    lowerAbdomen: {
      current: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0,
      },
      history: [historicalRecordSchema],
    },
    hips: {
      current: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0,
      },
      history: [historicalRecordSchema],
    },
    rightThigh: {
      current: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0,
      },
      history: [historicalRecordSchema],
    },
    leftThigh: {
      current: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.0,
      },
      history: [historicalRecordSchema],
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
fitnessDataSchema.plugin(toJSON);
fitnessDataSchema.plugin(paginate);

/**
 * @typedef FitnessData
 */
const FitnessData = mongoose.model('FitnessData', fitnessDataSchema);

module.exports = FitnessData;
