const db = require('../db');

const UserModel = require('./user');
const CarModel = require('./car');
const WorkModel = require('./work');

// associations will go below
UserModel.hasMany(CarModel);
UserModel.hasMany(WorkModel);

CarModel.belongsTo(UserModel);
CarModel.hasMany(WorkModel);

WorkModel.belongsTo(CarModel);
CarModel.hasMany(WorkModel);

module.exports = {
    dbConnection: db,
    models: {
        UserModel,
        CarModel,
        WorkModel
    }
};

module.exports = db;
