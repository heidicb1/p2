const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Function to get all students
const getAll = async (req, res) => {
    try {
        const students = await mongodb.getDatabase().db().collection('student').find().toArray();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching students.", details: error.message });
    }
};

// Function to get a single student by ID
const getSingle = async (req, res) => {
    const studentId = new ObjectId(req.params.id);
    try {
        const student = await mongodb.getDatabase().db().collection('student').findOne({ _id: studentId });
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
        } else {
            res.status(200).json(student);
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the student.", details: error.message });
    }
};

// Function to create a new student
const createstudent = async (req, res) => {
    const student = {
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
        const response = await mongodb.getDatabase().db().collection('student').insertOne(student);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json({ error: "Failed to insert student into the database." });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the student.", details: error.message });
    }
};

// Function to update a student by ID
const updatestudent = async (req, res) => {
    const studentId = new ObjectId(req.params.id);
    const student = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        major: req.body.major,
        gpa: req.body.gpa,
        enrollmentDate: req.body.enrollmentDate,
        projectedGraduationDate: req.body.projectedGraduationDate,
        email: req.body.email
    };
    
    try {
        const response = await mongodb.getDatabase().db().collection('student').replaceOne({ _id: studentId }, student);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the student.", details: error.message });
    }
};

// Function to delete a student by ID
const deletestudent = async (req, res) => {
    const studentId = new ObjectId(req.params.id);
    
    try {
        const response = await mongodb.getDatabase().db().collection('student').deleteOne({ _id: studentId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the student.", details: error.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createstudent,
    updatestudent,
    deletestudent
};
