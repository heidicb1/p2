
const express = require('express');
const router = express.Router();

const professorController = require('../controllers/professor');

router.get('/', professorController.getAll);

router.get('/:id', professorController.getSingle);

router.post('/', professorController.createUser);

router.put('/:id', professorController.updateUser);

router.delete('/:id', professorController.deleteUser);

module.exports = router;