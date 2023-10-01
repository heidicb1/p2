const mongodb = require('../data/database');

// This is the unique object ID that mongo assigns to all it's database entires. 
// It is basically a primary key of your data (example user_id)
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    // #swagger.tags=['professor] tags keep things together
    // variable that connects to the database
    // Use mongodb connection 
    // .db() is a mongodb function to get the database with opt. parameter 
    // the opt. parameter allows one to pass in the database name GOOD FOR multi database
    // ex. mongodb.initDb.getDatabase().db('professor').collection('professor').find()
    // However with this project just add professor to the of the .env file GOOD FOR single database
    // Find is a find command searches for wild cards or like and differnt fields
    const result = await mongodb.getDatabase().db().collection('professor').find();
    // Take results convert to an array then take teh object that comes back and call it professor
    // then it passes into anonymous function
    result.toArray().then((professor) => {
        // Attach this to response object
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(professor)
    }); // Can add a .catch err
};
const getSingle = async (req, res) => {
    // Just want the first professor in the array
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('professor').find( {_id: userId} );
    result.toArray().then((professor) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(professor)
    }); // Can add a .catch err
};

// In order for this to work we need a body parser in the app.js
const createUser = async (req, res) => {
    // #swagger.tags=['professor]
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        hireYear: req.body.hireYear,
        department: req.body.department,
        title: req.body.title,
        email: req.body.email,
        course: require.body.course
    };
    // Create user and user id
    const response = await mongodb.getDatabase().db().collection('professor').insertOne(user);
    // Check the response - basically if there is something there then it work 
    if (response.acknowledged) {
        res.status(204).send();
    // Otherwise print out this error
    } else {
        res.status(500).json(response.error || "Some error occured while creating the user.");
    }

};

const updateUser = async (req, res) => {
    // #swagger.tags=['professor]
    const userId = new ObjectId(req.params.id);
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        hireYear: req.body.hireYear,
        department: req.body.department,
        title: req.body.title,
        email: req.body.email,
        course: require.body.course
    };
    // Get user id and update it
    const response = await mongodb.getDatabase().db().collection('professor').replaceOne({ _id: userId }, user);
    // Check the response - basically if there is something there then it work 
    if (response.modifiedCount > 0) {
        res.status(204).send();
    // Otherwise print out this error
    } else {
        res.status(500).json(response.error || "Some error occured while updating the user.");
    }

};

const deleteUser = async (req, res) => {
    // #swagger.tags=['professor]
    const userId = new ObjectId(req.params.id);
    // Get user information and delete it
    const response = await mongodb.getDatabase().db().collection('professor').deleteOne({ _id: userId }, true);
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