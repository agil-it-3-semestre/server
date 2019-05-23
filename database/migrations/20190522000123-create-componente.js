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
        type: Sequelize.NUMBER
      },
      idComponente: {
        type: Sequelize.NUMBER
      },
      idEquipamento: {
        type: Sequelize.NUMBER
      },
      idNatureza: {
        type: Sequelize.NUMBER
      },
      qtdUtilizada: {
        type: Sequelize.NUMBER
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