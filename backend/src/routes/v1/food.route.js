const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const foodValidation = require('../../validations/food.validation');
const foodController = require('../../controllers/food.controller');

const router = express.Router();

router
  .route('/')
  .get(auth('getFoods'), validate(foodValidation.getFoods), foodController.getAllFoods)
  .post(auth('manageFoods'), validate(foodValidation.createFood), foodController.createFood);

router
  .route('/:foodId')
  .get(auth('getFoods'), validate(foodValidation.getFood), foodController.getFoodById)
  .put(auth('manageFoods'), validate(foodValidation.createFood), foodController.updateFoodById)
  .delete(auth('manageFoods'), validate(foodValidation.deleteFood), foodController.deleteFood);

module.exports = router;
