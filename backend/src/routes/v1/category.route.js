// category will nest subcategory underneath

const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const categoryValidation = require('../../validations/category.validation');
const subcategoryValidation = require('../../validations/subCategory.validation');
const categoryController = require('../../controllers/category.controller');

const router = express.Router();

// all category routes

router
    .route('/')
    .get()
    .post()

router
    .route('/:categoryId')
    .get()
    .put()
    .delete()

// all subcategory route

router
    .route('/:categoryId/subcategory')
    .get()
    .post()

    router
    .route('/:categoryId/subcategory/:subcategoryId')
    .get()
    .put()
    .delete()
    

