'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('notification', {
    description: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'description can not be empty'
        }
      }
    },
    icon: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'icon can not be empty'
        }
      }
    },
    redirection: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'redirection can not be empty'
        }
      }
    }
  });
  Notification.associate = function(models) {
    Notification.belongsTo(models.User, {
      foreignKey: 'userId'
    })
  };
  return Notification;
};