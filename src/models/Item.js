'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('item', {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        notEmpty: {
          msg: 'description can not be empty'
        }
      }
    },
    integrationId: {
      type: DataTypes.STRING,
      unique:true
    }
  });
  Item.associate = function(models) {
    Item.belongsToMany(models.Storage, {
      through: {
        model: models.Warehouse,
        unique: false
      },
      foreignKey: {
        name: 'itemId',
        allowNull: false,
        onDelete: 'CASCADE'
      }
    })

    Item.belongsTo(models.UnitMeasurement, {
      foreignKey: {
        name: 'unitMeasurementId',
        allowNull: false,
        onDelete: 'CASCADE'
      }
    })
  }
  return Item;
};