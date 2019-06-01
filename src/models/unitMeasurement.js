'use strict';
module.exports = (sequelize, DataTypes) => {
  const UnitMeasurement = sequelize.define('unitMeasurement', {
    integrationId: DataTypes.STRING,
    description: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
          notEmpty: {
            msg: 'description can not be empty'
          }
        }
      }
  }, {});
  UnitMeasurement.associate = function(models) {
    //
  };
  return UnitMeasurement;
};