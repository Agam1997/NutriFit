const httpStatus = require('http-status');
const { FitnessRegime } = require('../models');
const ApiError = require('../utils/ApiError');
const { userService } = require('.');

/**
 * create fitness data
 * @param {Object} fitnessRegimeBody
 * @returns {Promise<FitnessRegime>}
 */
const createFitnessRegime = async (userId, fitnessDataBody) => {
  fitnessDataBody = { ...fitnessDataBody, user: userId };
  return FitnessRegime.create(fitnessDataBody);
};

/**
 * Get all fitnessRegime for userid
 * @param {ObjectId} userid
 * @returns {Promise<FitnessRegime>}
 */
const getFitnessRegime = async (userId) => {
  return FitnessRegime.find({ user: userId });
};

/**
 * Get fitnessRegime by id
 * @param {ObjectId} id
 * @returns {Promise<FitnessRegime>}
 */
const getFitnessRegimeById = async (id) => {
  return FitnessRegime.findById(id);
};

/**
 * Update FitnessRegime by id
 * @param {ObjectId} FitnessRegimeId
 * @param {Object} updateBody
 * @returns {Promise<FitnessRegime>}
 */
const updateFitnessRegimeById = async (id, updateBody) => {
  const fitnessRegime = await getFitnessRegimeById(id);
  if (!fitnessRegime) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Fitness Regime not found');
  }
  Object.assign(fitnessRegime, updateBody);
  await fitnessRegime.save();
  return fitnessRegime;
};

module.exports = {
  createFitnessRegime,
  getFitnessRegime,
  getFitnessRegimeById,
  updateFitnessRegimeById,
};
