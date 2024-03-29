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
    priority: {
      type: DataTypes.ENUM({
        values: ['Baixa', 'Média', 'Alta']
      })
    },
    note: {
      type: DataTypes.BLOB,
      allowNull: true,
      get() {
        let note = this.getDataValue('note')
        return (note === null || note === undefined)? note : note.toString('utf8');
      },
    },
    maintenanceSpot: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Maintenance Spot can not be empty'
        }
      }
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
      foreignKey: {
        name: 'responsibleId',
        allowNull: false,
        onDelete: 'CASCADE'
      },
      as: 'responsible'
    })

    MaintenanceOrder.belongsTo(models.Equipment, {
      foreignKey: {
        name: 'equipmentId',
        allowNull: false,
        onDelete: 'CASCADE'
      }
    })

    MaintenanceOrder.hasMany(models.Operation, {
      foreignKey: 'maintenanceOrderId'
    })

    MaintenanceOrder.hasMany(models.Assignature, {
      foreignKey: 'maintenanceOrderId',
      as: 'assignatures'
    })
  }
  return MaintenanceOrder;
};