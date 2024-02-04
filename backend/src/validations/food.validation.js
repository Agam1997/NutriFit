const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFood = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    calories: Joi.number().required(),
    recipe: Joi.string(),
    ingredients: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().required(),
        quantity: Joi.string(),
      })
    ),
    category: Joi.string().required().custom(objectId),
  }),
};

const getFoods = {
  query: Joi.object().keys({
    name: Joi.string(),
    category: Joi.string().custom(objectId),
    sortBy: Joi.string(),
    // Add more query parameters as needed
  }),
};

const getFood = {
  params: Joi.object().keys({
    foodId: Joi.string().custom(objectId),
  }),
};

const updateFood = {
  params: Joi.object().keys({
    foodId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      calories: Joi.number(),
      recipe: Joi.string(),
      ingredients: Joi.array().items(
        Joi.object().keys({
          name: Joi.string(),
          quantity: Joi.string(),
        })
      ),
      category: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteFood = {
  params: Joi.object().keys({
    foodId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFood,
  getFoods,
  getFood,
  updateFood,
  deleteFood,
};
