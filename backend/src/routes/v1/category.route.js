// category will nest subcategory underneath

const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const subcategoryValidation = require('../../validations/subCategory.validation');
const categoryController = require('../../controllers/category.controller');
const subCategoryController = require('../../controllers/subcategory.controller');

const router = express.Router();

// all category routes

router
  .route('/')
  .get(auth('getCategory'), validate(categoryValidation.getCategories), categoryController.getCategory)
  .post(auth('manageCategory'), validate(categoryValidation.createCategory), categoryController.createCategory);

router
  .route('/:categoryId')
  .get(auth('getCategory'), validate(categoryValidation.getCategory), categoryController.getCategoryById)
  .put(auth('manageCategory'), validate(categoryValidation.updateCategory), categoryController.updateCategoryById)
  .delete(auth('manageCategory'), validate(categoryValidation.deleteCategory), categoryController.deleteCategory);

// all subcategory route

router
  .route('/:categoryId/subcategory')
  .get(auth('getSubCategory'), validate(subcategoryValidation.getSubcategories), subCategoryController.getSubCategory)
  .post(
    auth('manageSubCategory'),
    validate(subcategoryValidation.createSubcategory),
    subCategoryController.createSubCategory
  );

router
  .route('/:categoryId/subcategory/:subcategoryId')
  .get(auth('getSubCategory'), validate(subcategoryValidation.getSubcategory), subCategoryController.getSubCategoryById)
  .put(
    auth('manageSubCategory'),
    validate(subcategoryValidation.updateSubcategory),
    subCategoryController.updateSubCategoryById
  )
  .delete(
    auth('manageSubCategory'),
    validate(subcategoryValidation.deleteSubcategory),
    subCategoryController.deleteSubCategory
  );

module.exports = router;
