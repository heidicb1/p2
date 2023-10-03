// validation.js

const { body, validationResult } = require('express-validator');

const validateCreateUser = [
  body('firstName').notEmpty().isString(),
  body('lastName').notEmpty().isString(),
  body('hireYear').notEmpty().isNumeric(),
  body('department').notEmpty().isString(),
  body('title').notEmpty().isString(),
  body('email').notEmpty().isEmail(),
];

const validateUpdateUser = [
  body('firstName').optional().isString(),
  body('lastName').optional().isString(),
  body('hireYear').optional().isNumeric(),
  body('department').optional().isString(),
  body('title').optional().isString(),
  body('email').optional().isEmail(),
];

module.exports = {
  validateCreateUser,
  validateUpdateUser,
};
