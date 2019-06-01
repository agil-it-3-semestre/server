'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sector = sequelize.define('sector', {
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
    integratinId: {
      type: DataTypes.STRING,
      unique:true
    }
  }, {});
  Sector.associate = function(models) {
    //
  };
  return Sector;
};