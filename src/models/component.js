'use strict';
module.exports = (sequelize, DataTypes) => {
  const Component = sequelize.define('component', {
    quantityItem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Item quantity can not be empty'
        },
        isInt: {
          msg : 'Item quantity must have only numbers'
        }
      }
    }
  });
  Component.associate = function(models) {
    Component.belongsTo(models.MaintenanceOrder, {
      foreignKey: 'maintenanceOrderId'
    })

    Component.belongsTo(models.Storage, {
      foreignKey: 'storageId'
    })
    
    Component.belongsTo(models.Item, {
      foreignKey: 'itemId'
    })
  };
  return Component;
};

// 
// onDelete: 'CASCADE',