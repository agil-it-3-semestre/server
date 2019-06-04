'use strict';
module.exports = (sequelize, DataTypes) => {
  const UnitMeasurement = sequelize.define('unitMeasurement', {
    description: {
      type: DataTypes.STRING,
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
  }, {});
  UnitMeasurement.associate = function(models) {
    //
  };
  return UnitMeasurement;
};