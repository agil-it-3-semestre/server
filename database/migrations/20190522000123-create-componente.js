'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Componentes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idOrdemManutencao: {
        type: Sequelize.INTEGER
      },
      idComponente: {
        type: Sequelize.INTEGER
      },
      idEquipamento: {
        type: Sequelize.INTEGER
      },
      idNatureza: {
        type: Sequelize.INTEGER
      },
      qtdUtilizada: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Componentes');
  }
};