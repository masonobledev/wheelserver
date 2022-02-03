const { DataTypes } = require("sequelize");
const db = require("../db");

const Car = db.define("car", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  year: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  make: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  VIN: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = Car;