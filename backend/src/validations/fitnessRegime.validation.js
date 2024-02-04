const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFitnessRegime = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    duration: Joi.string(),
    caloriesBurned: Joi.string(),
  }),
};

const getFitnessRegime = {
  params: Joi.object().keys({
    fitnessRegimeId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFitnessRegime,
  getFitnessRegime,
};

