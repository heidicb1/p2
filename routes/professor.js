// Import modules and controllers
const express = require('express');
const router = express.Router();
// Import validation middleware for request validation
const validation = require('../middleware/validate');
// Import professorController for handling professor-related routes
const professorController = require('../controllers/professor'); 
const { isAuthenticated } = require('../middleware/authenticate');

// Define the routes and their corresponding controller functions
// Handle GET request to fetch all professors
router.get('/', professorController.getAll); 
// Handle GET request to fetch a single professor by ID
router.get('/:id', professorController.getSingle);
// Handle POST request to create a new professor, including validation 
router.post('/', isAuthenticated, validation.saveProfessor, professorController.createProfessor); 
// Handle PUT request to update a professor by ID
router.put('/:id', isAuthenticated, validation.saveProfessor, professorController.updateProfessor); 
// Handle DELETE request to delete a professor by ID
router.delete('/:id', isAuthenticated, professorController.deleteProfessor); 

// Export the router for use in the application
module.exports = router;
