const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Function to get all students
const getAll = async (req, res) => {
    try {
        const students = await mongodb.getDatabase().db().collection('student').find().toArray();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to get a single student by ID
const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    try {
        const student = await mongodb.getDatabase().db().collection('student').findOne({ _id: userId });
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
        } else {
            res.status(200).json(student);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to create a new student
const createUser = async (req, res) => {
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        major: req.body.major,
        gpa: req.body.gpa,
        enrollmentDate: req.body.enrollmentDate,
        projectedGraduationDate: req.body.projectedGraduationDate
    };
    
    try {
        const response = await mongodb.getDatabase().db().collection('student').insertOne(user);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while creating the user.");
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to update a student by ID
const updateUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        major: req.body.major,
        gpa: req.body.gpa,
        enrollmentDate: req.body.enrollmentDate,
        projectedGraduationDate: req.body.projectedGraduationDate
    };
    
    try {
        const response = await mongodb.getDatabase().db().collection('student').replaceOne({ _id: userId }, user);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to delete a student by ID
const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    
    try {
        const response = await mongodb.getDatabase().db().collection('student').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Student not found' });
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
