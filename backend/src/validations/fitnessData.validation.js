const { objectId } = require('./custom.validation');
const Joi = require('joi');

const createFitnessData = {
  body: Joi.object().keys({
    weight: Joi.string().required(),
    height: Joi.string().required(),
    neck: Joi.string().required(),
    rightBicep: Joi.string().required(),
    leftBicep: Joi.string().required(),
    chest: Joi.string().required(),
    upperAbdomen: Joi.string().required(),
    abdomen: Joi.string().required(),
    lowerAbdomen: Joi.string().required(),
    hips: Joi.string().required(),
    rightThigh: Joi.string().required(),
    leftThigh: Joi.string().required(),
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
