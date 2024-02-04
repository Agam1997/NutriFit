const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, fitnessRegimeService } = require('../services');

const createFitnessRegime = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const fitnessRegime = await fitnessRegimeService.createFitnessRegime(req.params.userId, req.body);
  res.status(httpStatus.CREATED).send(fitnessRegime);
});

const getFitnessRegime = catchAsync(async (req, res) => {
  const fitnessRegime = await fitnessRegimeService.getFitnessRegime(req.params.userId);
  if (!fitnessRegime) {
    throw new ApiError(httpStatus.NOT_FOUND, `No fitness regimes for user ${req.params.userId}`);
  }
  res.send(fitnessRegime);
});

const getFitnessRegimeById = catchAsync(async (req, res) => {
  const fitnessRegime = await fitnessRegimeService.getFitnessRegimeById(req.params.fitnessRegimeId);
  if (!fitnessRegime) {
    throw new ApiError(httpStatus.NOT_FOUND, `No fitness regime for Id ${req.params.fitnessRegimeId}`);
  }
  res.send(fitnessRegime);
});

const updateFitnessRegime = catchAsync(async (req, res) => {
  const fitnessRegime = await fitnessRegimeService.updateFitnessRegimeById(req.params.fitnessRegimeId, req.body);
  res.send(fitnessRegime);
});

module.exports = {
  createFitnessRegime,
  updateFitnessRegime,
  getFitnessRegime,
  getFitnessRegimeById,
};
