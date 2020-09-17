const { DataTypes } = require("sequelize");
const sequelize = require("../db");

module.exports = sequelize.define(
  "product",
  {
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Productquantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    Productcount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    product_description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    }
);
