const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSubcategory = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    parentCategory: Joi.string().required().custom(objectId),
  }),
};

const getSubcategories = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    parentCategory: Joi.string().custom(objectId),
  }),
};

const getSubcategory = {
  params: Joi.object().keys({
    subcategoryId: Joi.string().custom(objectId),
  }),
};

const updateSubcategory = {
  params: Joi.object().keys({
    subcategoryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      description: Joi.string(),
      parentCategory: Joi.string().custom(objectId),
    })
    .min(1),
};

const deleteSubcategory = {
  params: Joi.object().keys({
    subcategoryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createSubcategory,
  getSubcategories,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory,
};
