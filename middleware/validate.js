const validator = require('../helpers/validate');

const saveProfessor = (req, res, next) => {
  const validationRule = {
    firstName: 'required',
    lastName: 'required',
    hireYear: 'required',
    department: 'required',
    title: 'required',
    email: 'required|email',
    course: 'required'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveStudent = (req, res, next) => {
  const validationRule = {
    firstName: 'required',
    lastName: 'required',
    age: 'required',
    gender: 'required',
    major: 'required',
    gpa: 'required',
    enrollmentDate: 'required',
    projectedGraduationDate: 'required',
    email: 'required|email'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveProfessor,
  saveStudent
};


