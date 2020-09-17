const { DataTypes } = require("sequelize");
const sequelize = require("../db");
module.exports = sequelize.define(
  "order",
  {
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    }
    // ,
    //   totalprice:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    //   },
    //   totalquantity:
    //   {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //   }

    
  }
);