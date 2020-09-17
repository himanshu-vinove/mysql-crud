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
      allowNull: false,
      unique:true,
      validate:{
        isEmail : true
    }
    },
    phone_num :{
      type: DataTypes.BIGINT,
      unique:true,
      validate: {
        isNumeric: true
      }
    },
    password: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: false,
  }
);
