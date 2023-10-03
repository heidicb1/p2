const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('student').find();
    result.toArray().then((student) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(student);
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('student').find({ _id: userId });
    result.toArray().then((student) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(student);
    }).catch((err) => {
        res.status(500).json({ error: err.message });
    });
};

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
    const response = await mongodb.getDatabase().db().collection('student').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while creating the user.");
    }
};

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
    const response = await mongodb.getDatabase().db().collection('student').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while updating the user.");
    }
};

const deleteUser = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('student').deleteOne({ _id: userId }, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occurred while deleting the user.");
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
