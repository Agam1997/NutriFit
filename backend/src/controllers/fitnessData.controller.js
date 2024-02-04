const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { fitnessDataService, userService } = require('../services');

const createFitnessData = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  let fitnessDataPayload = req.body;

  // calculate BMI and fat percentage + attach to req.body
  let fatPercentage;
  if (user.gender === 'M') {
    fatPercentage = (
      86.01 * Math.log10(req.body.abdomen - req.body.neck) -
      70.041 * Math.log10(req.body.height) +
      36.76
    ).toFixed(2);
  } else {
    fatPercentage = (163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387).toFixed(2);
  }

  // Update historical records for each metric in the schema
  const metricsToUpdate = Object.keys(fitnessDataPayload);
  for (const metric of metricsToUpdate) {
    if (fitnessDataPayload[metric] && fitnessDataPayload[metric].current) {
      const historicalRecord = {
        value: fitnessDataPayload[metric].current,
        date: new Date(),
      };
      fitnessDataPayload[metric].history.push(historicalRecord);
    }
  }
  const bmi = req.body.weight / (req.body.height * req.body.height);
  fitnessDataPayload.fatPercentage = fatPercentage;
  fitnessDataPayload.bmi = bmi;
  const fitnessData = await fitnessDataService.createFitnessData(req.params.userId, fitnessDataPayload);
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
  const fitnessDataId = req.params.fitnessDataId;
  const updatedMetrics = req.body;

  // Update historical records for each updated metric
  const metricsToUpdate = Object.keys(updatedMetrics);
  for (const metric of metricsToUpdate) {
    if (updatedMetrics[metric] && updatedMetrics[metric].current) {
      const historicalRecord = {
        value: updatedMetrics[metric].current,
        date: new Date(),
      };
      updatedMetrics[metric].history.push(historicalRecord);
    }
  }
  const fitnessData = await fitnessDataService.updateFitnessDataById(fitnessDataId, updatedMetrics);
  res.send(fitnessData);
});

module.exports = {
  createFitnessData,
  updateFitnessData,
  getFitnessData,
};
