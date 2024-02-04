const { Food } = require('../models');

/**
 * Get Foods
 * @returns {Promise<Food>}
 */
const getAllFoods = async () => {
  return Food.find();
};

/**
 * Get Food by Id
 * @param {ObjectId} id
 * @returns {Promise<Food>}
 */
const getFoodById = async (id) => {
  return Food.findById(id);
};

/**
 * create Food
 * @param {Object} foodBody
 * @returns {Promise<Food>}
 */
const createFood = async (foodBody) => {
  return Food.create(foodBody);
};

/**
 * update Food
 * @param {Object} updateBody
 * @param {ObjectId} id
 * @returns {Promise<Food>}
 */
const updateFood = async (id, updateBody) => {
  return Food.findByIdAndUpdate(id, updateBody);
};

/**
 * Delete Food
 * @param {ObjectId} id
 * @returns {Promise<Food>}
 */
const deleteFood = async (id) => {
  const food = await getFoodById(id);
  if (!food) {
    throw new ApiError(httpStatus.NOT_FOUND, 'food not found');
  }
  await food.remove();
  return food;
};

module.exports = {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
};
