const { DataTypes } = require("sequelize");
const sequelize = require("../db");

module.exports = sequelize.define(
  "customer",
  {
    CustomerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone_num :{
      type: DataTypes.INTEGER,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: false,
  }
);
