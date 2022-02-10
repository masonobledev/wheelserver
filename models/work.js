const { DataTypes } = require("sequelize");
const db = require("../db");

const Work = db.define("work", {
  // id: {
  //   type: DataTypes.UUID,
  //   primaryKey: true,
  //   defaultValue: DataTypes.UUIDV4,
  //   allowNull: false,
  // },
  date: {
    type: DataTypes.DATE,
    required: true,
  },
  mileage: {
    type: DataTypes.INTEGER,
    required: true,
  },
  notes: {
    type: DataTypes.STRING,
    required: true,
  }
});

module.exports = Work;