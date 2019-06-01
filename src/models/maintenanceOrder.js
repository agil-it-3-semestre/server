'use strict';
module.exports = (sequelize, DataTypes) => {
  const MaintenanceOrder = sequelize.define('maintenanceOrder', {
    orderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Order Number can not be empty'
        },
        isInt: {
          msg : 'Order Number must have only numbers'
        }
      }
    },
    maintenanceType: {
      type: DataTypes.ENUM({
        values: ['Corretiva', 'Preventiva', 'Preditiva']
      }),
      allowNull: false
    },
    stoppedEquipment: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Stopped Equipment can not be empty'
        }
      }
    },
    codeABC: {
      type: DataTypes.STRING
    },
    plannedStart: {
      type: DataTypes.DATE
    },
    plannedFinish: {
      type: DataTypes.DATE
    },
    programmedStart: {
      type: DataTypes.DATE
    },
    programmedFinish: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM({
        values: [
          'Criado',
          'Em aberto',
          'Iniciado',
          'Pausado',
          'Parado',
          'Cancelado',
          'Pendente assinatura',
          'Pendente finalização',
          'Finalizado'
        ]
      })
    },
    prioridade: {
      type: DataTypes.ENUM({
        values: ['Baixa', 'Média', 'Alta']
      })
    },
    exported: {
      type: DataTypes.BOOLEAN
    },
    integrationId: {
      type: DataTypes.STRING,
      unique:true
    }
  },
  {
    indexes: [
      {
        name: 'finished_not_exported',
        fields: ['orderNumber', 'integrationId', 'status', 'exported'],
        where: {
          status: 'Finalizado',
          exported: false
        }
      }
    ]
  });
  MaintenanceOrder.associate = function(models) {
    MaintenanceOrder.belongsTo(models.User, {
      foreignKey: 'responsibleId'
    })

    MaintenanceOrder.belongsTo(models.Equipment, {
      foreignKey: 'equipmentId'
    })

    MaintenanceOrder.hasMany(models.Component, {
      foreignKey: 'maintenanceOrderId'
    })

    MaintenanceOrder.hasMany(models.Operation, {
      foreignKey: 'maintenanceOrderId'
    })
  }
  return MaintenanceOrder;
};