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
      id: {
        type: Sequelize.NUMBER
      },
      numeroOrdem: {
        type: Sequelize.NUMBER
      },
      idIntegracao: {
        type: Sequelize.STRING
      },
      idEquipamento: {
        type: Sequelize.NUMBER
      },
      idEquipamentoSuperior: {
        type: Sequelize.NUMBER
      },
      idSetor: {
        type: Sequelize.NUMBER
      },
      idResponsavelOrdem: {
        type: Sequelize.NUMBER
      },
      idTipoManutencao: {
        type: Sequelize.NUMBER
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
        type: Sequelize.NUMBER
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