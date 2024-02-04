const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { subcategoryService } = require('../services');

const getSubCategory = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'description', 'parentCategory']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await subcategoryService.queryCategory(filter, options);
  res.send(result);
});

const getSubCategoryById = catchAsync(async (req, res) => {
  const subCategory = await subcategoryService.getSubCategoryById(req.params.subcategoryId);
  if (!subCategory) {
    throw new ApiError(httpStatus.NOT_FOUND, `No category found`);
  }
  res.send(subCategory);
});

const createSubCategory = catchAsync(async (req, res) => {
  const subCategory = await subcategoryService.createSubCategory(req.body);
  res.status(httpStatus.CREATED).send(subCategory);
});

const updateSubCategoryById = catchAsync(async (req, res) => {
  const subCategory = await subcategoryService.updateSubCategoryById(req.params.subcategoryId, req.body);
  res.send(subCategory);
});

const deleteSubCategory = catchAsync(async (req, res) => {
  const subCategory = await subcategoryService.deleteSubCategory(req.params.subcategoryId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getSubCategory,
  getSubCategoryById,
  createSubCategory,
  updateSubCategoryById,
  deleteSubCategory,
};
