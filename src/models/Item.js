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
    integratinId: {
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
      foreignKey: 'itemId'
    })

    Item.belongsTo(models.UnitMeasurement, {
      foreignKey: 'unitMeasurementId'
    })
  }
  return Item;
};