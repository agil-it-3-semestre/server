'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dados_Operacao = sequelize.define('Dados_Operacao', {
    idOrdemManutencao: DataTypes.NUMBER,
    idOperacao: DataTypes.NUMBER,
    descricao: DataTypes.STRING,
    tempo: DataTypes.TIME,
    execucao: DataTypes.STRING
  }, {});
  Dados_Operacao.associate = function(models) {
    Componente.belongsTo(models.Ordem_Manutencao, {
      foreignKey: 'idOrdemManutencao',
      onDelete: 'CASCADE',
    });
  };
  return Dados_Operacao;
};