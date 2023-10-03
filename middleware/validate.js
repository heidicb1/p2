const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json())
const { body, validationResult } = require('express-validator');

const saveProfessor = (req, res, next) => {
  console.log('Request Body:', req.body);
  // Define validation rules for the 'firstName' field
  const validationRules = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('hireYear').notEmpty().withMessage('Hire Year is required'),
    body('department').notEmpty().withMessage('Department is required'),
    body('title').notEmpty().withMessage('Title is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('course').notEmpty().withMessage('Course is required')
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
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('age').notEmpty().withMessage('Age is required'),
    body('gender').notEmpty().withMessage('Gender is required'),
    body('major').notEmpty().withMessage('Major is required'),
    body('gpa').notEmpty().withMessage('GPA is required'),
    body('enrollmentDate').notEmpty().withMessage('Enrollment date is required'),
    body('projectedGraduationDate').notEmpty().withMessage('Projected graduation date is required'),
    body('email').notEmpty().withMessage('Email is required')
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
