const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    // #swagger.tags=['professor] tags keep things together
    mongodb.getDatabase().db().collection('professor').find()
    .toArray((err, professor) =>{
        if (err) {
            res.status(400).json({message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(professor)
    });
};
const getSingle = (req, res) => {
    const professorId = new ObjectId(req.params.id);
    mongodb.getDatabase().db().collection('professor').find( {_id: professorId} )
    .toArray((err, result) => {
        if (err) {
            res.status(400).json({message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
    });
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