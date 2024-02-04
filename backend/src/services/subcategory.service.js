const httpStatus = require('http-status');
const { Subcategory } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a subcategory
 * @param {Object} subcategoryBody
 * @returns {Promise<Subcategory>}
 */
const createSubCategory = async (subcategoryBody) => {
  if (await Subcategory.isNameTaken(subcategoryBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Subcategory Name already taken');
  }
  return Subcategory.create(subcategoryBody);
};

/**
 * Query for subcategory
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySubCategory = async (filter, options) => {
  const subcategory = await Subcategory.paginate(filter, options);
  return subcategory;
};

/**
 * Get subcategory by id
 * @param {ObjectId} id
 * @returns {Promise<Subcategory>}
 */
const getSubCategoryById = async (id) => {
  return Subcategory.findById(id);
};

/**
 * Update sub category by id
 * @param {ObjectId} subCategoryId
 * @param {Object} updateBody
 * @returns {Promise<Subcategory>}
 */
const updateSubCategoryById = async (subCategoryId, updateBody) => {
  const subcategory = await getSubCategoryById(subCategoryId);
  if (!subcategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sub Category not found');
  }
  if (updateBody.name && (await Subcategory.isNameTaken(updateBody.name, subCategoryId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sub category Name already taken');
  }
  Object.assign(subcategory, updateBody);
  await subcategory.save();
  return subcategory;
};

/**
 * Delete sub category by id
 * @param {ObjectId} subCategoryId
 * @returns {Promise<Subcategory>}
 */
const deleteSubCategoryById = async (subCategoryId) => {
  const subcategory = await getSubCategoryById(subCategoryId);
  if (!subcategory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'subcategory not found');
  }
  await subcategory.remove();
  return subcategory;
};

module.exports = {
  createSubCategory,
  querySubCategory,
  getSubCategoryById,
  updateSubCategoryById,
  deleteSubCategoryById,
};
