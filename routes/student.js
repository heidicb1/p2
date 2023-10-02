// Add express and express router
const express = require('express');
const router = express.Router();

// Redirect to another folder called controllers to keep all logic straight
const studentController = require('../controllers/student');

// create two routes get and get all in this current file and variables in the user.js controllers folder 
// Add all 5 endpoints
// get all route
router.get('/', studentController.getAll);
// get route
router.get('/:id', studentController.getSingle);
// Used to create
router.post('/', studentController.createUser);
// Used to update
router.put('/:id', studentController.updateUser);
// Used to remove
router.delete('/:id', studentController.deleteUser);
// Export
module.exports = router;