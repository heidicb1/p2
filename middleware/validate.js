const validator = require('../helpers/validate');

const saveProfessor = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    hireYear: 'required|int',
    department: 'required|string',
    title: 'required|string',
    email: 'required|email',
    course: 'required|string'
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
  saveProfessor
};