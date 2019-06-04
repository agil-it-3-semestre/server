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
    },
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'component_sequence'
    },
    operationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'component_sequence'
    },
  });
  Component.associate = function(models) {
    
    Component.belongsTo(models.Storage, {
      foreignKey: {
        name: 'storageId',
        allowNull: false,
        onDelete: 'CASCADE'
      }
    })
    
    Component.belongsTo(models.Item, {
      foreignKey: {
        name: 'itemId',
        allowNull: false,
        onDelete: 'CASCADE'
      }
    })

    Component.belongsTo(models.Operation, {
      foreignKey: 'operationId'
    })
  };
  return Component;
};