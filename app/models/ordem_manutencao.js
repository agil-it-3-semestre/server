'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ordem_Manutencao = sequelize.define('Ordem_Manutencao', {
    numeroOrdem: DataTypes.NUMBER,
    idIntegracao: DataTypes.STRING,
    idEquipamento: DataTypes.NUMBER,
    idEquipamentoSuperior: DataTypes.NUMBER,
    idResponsavelOrdem: DataTypes.NUMBER,
    idTipoManutencao: DataTypes.NUMBER,
    requerParada: DataTypes.BOOLEAN,
    codigoABC: DataTypes.STRING,
    inicioPlanejamento: DataTypes.DATE,
    fimPlanejamento: DataTypes.DATE,
    inicioProgramado: DataTypes.DATE,
    fimProgramado: DataTypes.DATE,
    status: DataTypes.STRING,
    prioridade: DataTypes.NUMBER,
    exportado: DataTypes.BOOLEAN
  }, {});
  Ordem_Manutencao.associate = function(models) {
    Ordem_Manutencao.hasOne(models.Equipamento, {
      foreignKey: 'idEquipamento',
      as: 'Equipamento',
    })
    Ordem_Manutencao.hasOne(models.Equipamento, {
      foreignKey: 'idEquipamentoSuperior',
      as: 'EquipamentoSuperior',
    })
    Ordem_Manutencao.hasOne(models.User, {
      foreignKey: 'idResponsavelOrdem',
      as: 'Responsavel',
    })
    Ordem_Manutencao.hasOne(models.Tipo_Manutencao, {
      foreignKey: 'idTipoManutencao',
      as: 'TipoManutencao',
    })
    Ordem_Manutencao.hasMany(models.Dados_Operacao, {
      foreignKey: 'idOrdemManutencao',
      as: 'Operacoes',
    })
    Ordem_Manutencao.hasMany(models.Componente, {
      foreignKey: 'idOrdemManutencao',
      as: 'Componentes',
    })
  };
  return Ordem_Manutencao;
};