// Add express and express router
const express = require('express');
const router = express.Router();

// Redirect to another folder called controllers to keep all logic straight
const professorController = require('../controllers/professor');

// create two routes get and get all in this current file and variables in the user.js controllers folder 
// Add all 5 endpoints
// get all route
router.get('/', professorController.getAll);
// get route
router.get('/:id', professorController.getSingle);
// Used to create
router.post('/', professorController.createUser);
// Used to update
router.put('/:id', professorController.updateUser);
// Used to remove
router.delete('/:id', professorController.deleteUser);
// Export
module.exports = router;