'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ordem_Manutencaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numeroOrdem: {
        type: Sequelize.INTEGER
      },
      idIntegracao: {
        type: Sequelize.STRING
      },
      idEquipamento: {
        type: Sequelize.INTEGER
      },
      idEquipamentoSuperior: {
        type: Sequelize.INTEGER
      },
      idResponsavelOrdem: {
        type: Sequelize.INTEGER
      },
      idTipoManutencao: {
        type: Sequelize.INTEGER
      },
      requerParada: {
        type: Sequelize.BOOLEAN
      },
      codigoABC: {
        type: Sequelize.STRING
      },
      inicioPlanejamento: {
        type: Sequelize.DATE
      },
      fimPlanejamento: {
        type: Sequelize.DATE
      },
      inicioProgramado: {
        type: Sequelize.DATE
      },
      fimProgramado: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      prioridade: {
        type: Sequelize.INTEGER
      },
      exportado: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('Ordem_Manutencaos');
  }
};