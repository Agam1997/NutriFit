const { objectId } = require('./custom.validation');
const Joi = require('joi');

const metricValidation = Joi.object().keys({
  current: Joi.number().required(),
  history: Joi.array().items(
    Joi.object().keys({
      value: Joi.number().required(),
      date: Joi.date().required(),
    })
  ),
});

const createFitnessData = {
  body: Joi.object().keys({
    weight: metricValidation.required(),
    height: Joi.number().required(),
    neck: metricValidation.required(),
    rightBicep: metricValidation.required(),
    leftBicep: metricValidation.required(),
    chest: metricValidation.required(),
    upperAbdomen: metricValidation.required(),
    abdomen: metricValidation.required(),
    lowerAbdomen: metricValidation.required(),
    hips: metricValidation.required(),
    rightThigh: metricValidation.required(),
    leftThigh: metricValidation.required(),
  }),
};

const getFitnessData = {
  params: Joi.object().keys({
    fitnessDataId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFitnessData,
  getFitnessData,
};
