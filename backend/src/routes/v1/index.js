const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const foodRoute = require('./food.route');
const categoryRoute = require('./category.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/foods',
    route: foodRoute,
  },
  {
    path: '/category', // subcategory to be mapped against each catgory as /category/:id/subCategory
    route: categoryRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
