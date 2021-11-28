/* global Helpers */
const cors = require('cors');
const express = require('express');
const enrouten = require('express-enrouten');
const cuid = require('cuid');
const fileUpload = require('express-fileupload');

const middleware = require('./middlewares');

global.Helpers = require('./helpers/common');

const app = express();
app.use(cors());

// app.use(expressValidator());

// Embedd RequestId
app.use((req, _res, next) => {
  req.requestId = cuid();
  next();
});

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// Logger
app.set('etag', false);

// Authentication Middleware
app.use('/', middleware.auth.validateToken);

// Routing
app.get('/', (_req, res) => Helpers.successResponse(res, 200, 'pong'));
app.use('/api', enrouten({ directory: 'routes' }));

// Not Found handler
/* eslint-disable no-unused-vars */
app.use('*', (_req, res) => {
  res.status(404).json({
    message: 'Resource not found.',
  });
});

// Error handler
app.use((err, _req, res, _next) => Helpers.errorResponse(res, null, err));

module.exports = app;
