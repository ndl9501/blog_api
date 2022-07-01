const express = require('express');
// const authRoute = require('./auth.route');
const customerRoute = require('./customer.route');
const tagRoute = require('./tag.route');
const categoryRoute = require('./category.route');
const premisionRoute = require('./premision.route');
const authRoute = require('./auth.route');
const blogRoute = require('./blog.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/customer',
    route: customerRoute,
  },
  {
    path: '/tag',
    route: tagRoute,
  },
  {
    path: '/category',
    route: categoryRoute,
  },
  {
    path: '/premision',
    route: premisionRoute,
  },
  {
    path: "/auth",
    route: authRoute
  },
  {
    path: "/blog",
    route: blogRoute
  }
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;