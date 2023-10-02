const mongodb = require('../data/database');

// This is the unique object ID that mongo assigns to all it's database entires. 
// It is basically a primary key of your data (example user_id)
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    // #swagger.tags=['student] tags keep things together
    const result = await mongodb.getDatabase().db().collection('student').find();
    // Take results convert to an array then take teh object that comes back and call it student
    // then it passes into anonymous function
    result.toArray().then((student) => {
        // Attach this to response object
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(student)
    }); // Can add a .catch err
};
const getSingle = async (req, res) => {
    // Just want the first student in the array
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('student').find( {_id: userId} );
    result.toArray().then((student) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(student)
    }); // Can add a .catch err
};

// In order for this to work we need a body parser in the app.js
const createUser = async (req, res) => {
    // #swagger.tags=['student]
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        major: req.body.majpr,
        gpa: req.body.gpa,
        enrollmentDate: require.body.enrollmentDate,
        projectedGraduationDate: require.body.projectedGraduationDate
    };
    // Create user and user id
    const response = await mongodb.getDatabase().db().collection('student').insertOne(user);
    // Check the response - basically if there is something there then it work 
    if (response.acknowledged) {
        res.status(204).send();
    // Otherwise print out this error
    } else {
        res.status(500).json(response.error || "Some error occured while creating the user.");
    }

};

const updateUser = async (req, res) => {
    // #swagger.tags=['student]
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        major: req.body.majpr,
        gpa: req.body.gpa,
        enrollmentDate: require.body.enrollmentDate,
        projectedGraduationDate: require.body.projectedGraduationDate
    };
    // Get user id and update it
    const response = await mongodb.getDatabase().db().collection('student').replaceOne({ _id: userId }, user);
    // Check the response - basically if there is something there then it work 
    if (response.modifiedCount > 0) {
        res.status(204).send();
    // Otherwise print out this error
    } else {
        res.status(500).json(response.error || "Some error occured while updating the user.");
    }

};

const deleteUser = async (req, res) => {
    // #swagger.tags=['student]
    const userId = new ObjectId(req.params.id);
    // Get user information and delete it
    const response = await mongodb.getDatabase().db().collection('student').deleteOne({ _id: userId }, true);
    // Check the response - basically if there is something there then it work 
    if (response.deletedCount > 0) {
        res.status(204).send();
    // Otherwise print out this error
    } else {
        res.status(500).json(response.error || "Some error occured while deleting the user.");
    }

};

// Export functions

module.exports = {
    getAll, 
    getSingle,
    createUser,
    updateUser,
    deleteUser
};