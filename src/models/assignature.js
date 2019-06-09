"use strict";
module.exports = (sequelize, DataTypes) => {
  const Assignature = sequelize.define("assignature", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    maintenanceOrderId: {
      type: DataTypes.INTEGER,
      unique: 'user_order_assignature'
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: 'user_order_assignature'
    }
  });

  Assignature.associate = function(models) {
    //*
    Assignature.belongsTo(models.MaintenanceOrder, {  
      foreignKey: {
        name: 'maintenanceOrderId',
        allowNull: false,
        onDelete: 'CASCADE'
      }
    })
    Assignature.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
        onDelete: 'CASCADE'
      }
    })/**/
  }
  return Assignature;
};