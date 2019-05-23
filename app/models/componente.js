'use strict';
module.exports = (sequelize, DataTypes) => {
  const Componente = sequelize.define('Componente', {
    idOrdemManutencao: DataTypes.NUMBER,
    idComponente: DataTypes.NUMBER,
    idProduto: DataTypes.NUMBER,
    idNatureza: DataTypes.NUMBER,
    qtdUtilizada: DataTypes.NUMBER
  }, {});
  Componente.associate = function(models) {
    Componente.belongsTo(models.Ordem_Manutencao, {
      foreignKey: 'idOrdemManutencao',
      onDelete: 'CASCADE',
    });
    Componente.hasOne(models.Produto, {
      foreignKey: 'idProduto',
      as: 'Produto',
    })
  };
  return Componente;
};