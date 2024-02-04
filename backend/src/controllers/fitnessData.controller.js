const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { fitnessDataService, userService } = require('../services');

const createFitnessData = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);

  // calculate BMI and fat percentage + attach to req.body
  const fatPercentage = 0.0;
  if (user.gender == 'M') {
    fatPercentage = (
      86.01 * Math.log10(req.body.abdomen - req.body.neck) -
      70.041 * Math.log10(req.body.height) +
      36.76
    ).toFixed(2);
  } else {
    fatPercentage = (163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387).toFixed(2);
  }
  const bmi = req.body.weight / (req.body.height * req.body.height);
  req.body.fatPercentage = fatPercentage;
  req.body.bmi = bmi;
  const fitnessData = await fitnessDataService.createFitnessData(req.params.userId, req.body);
  res.status(httpStatus.CREATED).send(fitnessData);
});

const getFitnessData = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  const fitnessData = await fitnessDataService.getFitnessDataById(user.fitnessData);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(fitnessData);
});

const updateFitnessData = catchAsync(async (req, res) => {
  const fitnessData = await fitnessDataService.updateFitnessDataById(req.params.fitnessDataId, req.body);
  res.send(fitnessData);
});

module.exports = {
  createFitnessData,
  updateFitnessData,
  getFitnessData,
};
