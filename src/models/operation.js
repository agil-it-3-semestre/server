'use strict';
module.exports = (sequelize, DataTypes) => {
  const Operation = sequelize.define('operation', {
    description: {
      type:DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        notEmpty: {
          msg: 'description can not be empty'
        }
      }
    },
    timeExecuted: DataTypes.TIME,
    taskExecuted: DataTypes.STRING
  });
  
  Operation.associate = function(models) {
    Operation.belongsTo(models.MaintenanceOrder, {
      foreignKey: 'maintenanceOrderId'
    })

    Operation.belongsTo(models.User, {
      foreignKey: 'technicianId'
    })
  }
  return Operation;
};