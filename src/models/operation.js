'use strict';
module.exports = (sequelize, DataTypes) => {
  const Operation = sequelize.define('operation', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'description can not be empty'
        }
      }
    },
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'operation_sequence'
    },
    maintenanceOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'operation_sequence'
    },
    timeExecuted: DataTypes.TIME,
    taskExecuted: DataTypes.STRING
  });
  
  Operation.associate = function(models) {
    Operation.belongsTo(models.User, {
      foreignKey: {
        name: 'technicianId',
        allowNull: false,
        onDelete: 'CASCADE'
      },
      as: 'technician'
    })
    
    Operation.hasMany(models.Component, {
      foreignKey: 'operationId'
    })

    Operation.belongsTo(models.MaintenanceOrder, {
      foreignKey: {
        name: 'maintenanceOrderId',
        allowNull: false,
        onDelete: 'CASCADE'
      }
    })
  }
  return Operation;
};