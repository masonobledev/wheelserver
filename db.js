const { Sequelize } = require('sequelize');
//Option 3: Passing parameters separately
const sequelize = new Sequelize('wheel', 'postgres', 'admin', {
        host: 'localhost',
        dialect: 'postgres',
    })

module.exports = sequelize;