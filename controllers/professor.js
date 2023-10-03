const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Function to get all professors
const getAll = async (req, res) => {
    try {
        const professors = await mongodb.getDatabase().db().collection('professor').find().toArray();
        res.status(200).json(professors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get a single professor by ID
const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    try {
        const professor = await mongodb.getDatabase().db().collection('professor').findOne({ _id: userId });
        if (!professor) {
            res.status(404).json({ message: 'Professor not found' });
        } else {
            res.status(200).json(professor);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to create a new professor
const createUser = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        hireYear: req.body.hireYear,
        department: req.body.department,
        title: req.body.title,
        email: req.body.email,
        course: req.body.course
    };
    
    try {
        const response = await mongodb.getDatabase().db().collection('professor').insertOne(user);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while creating the user.");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to update a professor by ID
const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        hireYear: req.body.hireYear,
        department: req.body.department,
        title: req.body.title,
        email: req.body.email,
        course: req.body.course
    };
    
    try {
        const response = await mongodb.getDatabase().db().collection('professor').replaceOne({ _id: userId }, user);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Professor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to delete a professor by ID
const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    
    try {
        const response = await mongodb.getDatabase().db().collection('professor').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Professor not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};