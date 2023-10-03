const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    // #swagger.tags=['professor] tags keep things together
    // Take results convert to an array then take the object that comes back and call it professor
    // then it passes into anonymous function
    result.toArray().then((professor) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(professor)
    }); // ADD .catch err
};
const getSingle = async (req, res) => {
    // #swagger.tags=['professor]
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('professor').find( {_id: userId} );
    result.toArray().then((professor) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(professor)
    }); // ADD a .catch err
};

const createUser = async (req, res) => {
    // #swagger.tags=['professor]
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('professor').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
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
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
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