'use strict';
module.exports = (sequelize, DataTypes) => {
  const Equipment = sequelize.define('equipment', {
    description: {
      type:DataTypes.STRING,
      allowNull: false,
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
  Equipment.associate = function(models) {
    Equipment.belongsTo(models.Sector, {
      foreignKey: 'sectorId'
    })
  };
  return Equipment;
};