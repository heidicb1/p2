const mongodb = require('../data/database');


const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
    // #swagger.tags=['professor] tags keep things together

    const result = await mongodb.getDatabase().db().collection('professor').find();

    result.toArray().then((professor) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(professor)
    }); // Can add a .catch err
};
const getSingle = async (req, res) => {
    const professorId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('professor').find( {_id: professorId} );
    result.toArray().then((professor) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(professor)
    }); // Can add a .catch err
};


const createUser = async (req, res) => {
    // #swagger.tags=['professor]
    const professor = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        hireYear: req.body.hireYear,
        department: req.body.department,
        title: req.body.title,
        email: req.body.email,
        course: require.body.course
    };
    
    const response = await mongodb.getDatabase().db().collection('professor').insertOne(professor); 
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occured while creating the professor.");
    }

};

const updateUser = async (req, res) => {
    // #swagger.tags=['professor]
    const professorId = new ObjectId(req.params.id);
    const professor = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        hireYear: req.body.hireYear,
        department: req.body.department,
        title: req.body.title,
        email: req.body.email,
        course: require.body.course
    };
    
    const response = await mongodb.getDatabase().db().collection('professor').replaceOne({ _id: professorId }, professor);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occured while updating the professor.");
    }

};

const deleteUser = async (req, res) => {
    // #swagger.tags=['professor]
    const professorId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('professor').deleteOne({ _id: professorId }, true);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || "Some error occured while deleting the professor.");
    }

};


module.exports = {
    getAll, 
    getSingle,
    createUser,
    updateUser,
    deleteUser
};