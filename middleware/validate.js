const { body, validationResult } = require('express-validator');

const saveProfessor = (req, res, next) => {
  console.log('Request Body:', req.body);
  // Define validation rules for the 'firstName' field
  const validationRules = [
    body('firstName').notEmpty().withMessage('First name is required'),
    // Add more validation rules for other fields if needed
  ];

  // Run validation
  Promise.all(validationRules.map(validation => validation.run(req))).then(() => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Validation failed, send an error response
      return res.status(412).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    // Validation passed, proceed to the next middleware
    next();
  });
};

const saveStudent = (req, res, next) => {
  console.log('Request Body:', req.body);
  // Define validation rules for the 'firstName' field
  const validationRules = [
    body('firstName').notEmpty().withMessage('First name is required'),
    // Add more validation rules for other fields if needed
  ];

  // Run validation
  Promise.all(validationRules.map(validation => validation.run(req))).then(() => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Validation failed, send an error response
      return res.status(412).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array(),
      });
    }

    // Validation passed, proceed to the next middleware
    next();
  });
};
module.exports = {
  saveProfessor,
  saveStudent
};
