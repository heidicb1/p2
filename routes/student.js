// Add express and express router
const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
// Redirect to another folder called controllers to keep all logic straight
const studentController = require('../controllers/student');


// create two routes get and get all in this current file and variables in the student.js controllers folder 
// Add all 5 endpoints
// get all route
router.get('/', studentController.getAll);
// get route
router.get('/:id', studentController.getSingle);
// Used to create
router.post('/', validation.saveStudent, studentController.createstudent);
// Used to update
router.put('/:id', validation.saveStudent, studentController.updatestudent);
// Used to remove
router.delete('/:id', studentController.deletestudent);
// Export
module.exports = router;