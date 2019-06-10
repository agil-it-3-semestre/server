"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name can not be empty'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique:true,
      isEmail: {
        msg: 'Invalid e-mail format'
      },
      validate: {
        notEmpty: {
          msg: 'Email can not be empty'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password can not be empty'
        },
        len:{
          args:[6,30],
          msg: 'Password must have beetwhen 6 and 30 characters'
        }
      }
    },
    role: {
      type: DataTypes.ENUM({
        values: ['Administrator', 'Maintainer Leader', 'Maintainer', 'Worker']
      }),
      allowNull:false
    },
    contact: {
      type: DataTypes.STRING
    },
    forceChangePassword: {
      type: DataTypes.BOOLEAN,
    },
    bornDate: {
      type: DataTypes.DATE
    },
    gender: {
      type: DataTypes.ENUM({
        values: ['Masculino', 'Feminino']
      }),
      allowNull: false
    },
    integrationId: {
      type: DataTypes.STRING,
      unique:true
    }
  });

  User.associate = function(models) {
    User.hasMany(models.Assignature, {
      foreignKey: 'userId',
      as: 'assignatures'
    })
  }
  return User;
};