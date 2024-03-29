'use strict';
module.exports = (sequelize, DataTypes) => {
  const Storage = sequelize.define('storage', {
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
    integrationId: {
      type: DataTypes.STRING,
      unique:true
    }
  });
  Storage.associate = function(models) {
    Storage.belongsToMany(models.Item, {
      through: {
        model: models.Warehouse,
        unique: false
      },
      foreignKey: {
        name: 'storageId',
        allowNull: false,
        onDelete: 'CASCADE'
      }
    })
  };
  return Storage;
};