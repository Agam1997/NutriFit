const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { foodService, userService } = require('../services');

const getAllFoods = catchAsync(async (req, res) => {
  const foods = await foodService.getAllFoods(req.params.userId);
  if (!foods) {
    throw new ApiError(httpStatus.NOT_FOUND, `No foods found`);
  }
  res.send(foods);
});

const getFoodById = catchAsync(async (req, res) => {
  const food = await foodService.getFoodById(req.params.foodId);
  if (!food) {
    throw new ApiError(httpStatus.NOT_FOUND, `No food found`);
  }
  res.send(food);
});

const createFood = catchAsync(async (req, res) => {
  const food = await foodService.createFood(req.body);
  res.status(httpStatus.CREATED).send(food);
});

const updateFoodById = catchAsync(async (req, res) => {
  const food = await foodService.updateFood(req.params.foodId, req.body);
  res.send(food);
});

const deleteFood = catchAsync(async (req, res) => {
  const food = await foodService.deleteFood(req.params.foodId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getAllFoods,
  getFoodById,
  createFood,
  updateFoodById,
  deleteFood,
};
