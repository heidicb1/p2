const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professor');
const validation = require('../middleware/validate');

router.get('/', professorController.getAll);

router.get('/:id', professorController.getSingle);

router.post('/', validation.saveProfessor, professorController.createUser);

router.put('/:id', professorController.updateUser);

router.delete('/:id', professorController.deleteUser);

module.exports = router;