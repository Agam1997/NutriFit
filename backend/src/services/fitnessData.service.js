const httpStatus = require('http-status');
const { FitnessData } = require('../models');
const ApiError = require('../utils/ApiError');
const { userService } = require('.');

/**
 * create fitness data
  * @param {ObjectId} userId
 * @param {Object} fitnessDataBody
 * @returns {Promise<FitnessData>}
 */
const createFitnessData = async (userId, fitnessDataBody) => {
  let fitnessData = await FitnessData.create(fitnessDataBody);
  // update fitnessData created ID on user
  await userService.updateUserById(userId, { fitnessData: fitnessData._id });
  return fitnessData;
};

/**
 * Get fitnessData by userid
 * @param {ObjectId} userid
 * @returns {Promise<FitnessData>}
 */
const getFitnessDataById = async (id) => {
  return FitnessData.findById(id);
};

/**
 * Update FitnessData by id
 * @param {ObjectId} fitnessDataId
 * @param {Object} updateBody
 * @returns {Promise<FitnessData>}
 */
const updateFitnessDataById = async (id, updateBody) => {
  const fitnessData = await getFitnessDataById(id);
  if (!fitnessData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Fitness data not found');
  }
  Object.assign(fitnessData, updateBody);
  await fitnessData.save();
  return fitnessData;
};


module.exports = {
  createFitnessData,
  getFitnessDataById,
  updateFitnessDataById,
};
