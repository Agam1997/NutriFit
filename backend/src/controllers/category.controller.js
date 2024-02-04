const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const getCategory = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'description', 'subcategories']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await categoryService.queryCategory(filter, options);
  res.send(result);
});

const getCategoryById = catchAsync(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, `No category found`);
  }
  res.send(category);
});

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});

const updateCategoryById = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategoryById(req.params.categoryId, req.body);
  res.send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  const category = await foodService.deleteCategory(req.params.categoryId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getCategory,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategory,
};
