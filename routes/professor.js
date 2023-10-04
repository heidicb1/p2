// Import modules and controllers
const express = require('express');
const router = express.Router();
// Import validation middleware for request validation
const validation = require('../middleware/validate');
// Import professorController for handling professor-related routes
const professorController = require('../controllers/professor'); 
 

// Define the routes and their corresponding controller functions
// Handle GET request to fetch all professors
router.get('/professor', professorController.getAll); 
// Handle GET request to fetch a single professor by ID
router.get('/professor:id', professorController.getSingle);
// Handle POST request to create a new professor, including validation 
router.post('/professor', validation.saveProfessor, professorController.createProfessor); 
// Handle PUT request to update a professor by ID
router.put('/professor:id', validation.saveProfessor, professorController.updateProfessor); 
// Handle DELETE request to delete a professor by ID
router.delete('/professor:id', professorController.deleteProfessor); 

// Export the router for use in the application
module.exports = router;
