const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const foodValidation = require('../../validations/fitnessData.validation');

const router = express.Router();

router
    .route('/')
    .get(auth('getFoods'))
    .post(auth('manageFoods'))

router
    .route('/:foodId')
    .get(auth('getFoods'))
    .put(auth('manageFoods'))
    .delete(auth('manageFoods'))

