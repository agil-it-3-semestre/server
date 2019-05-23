'use strict';
module.exports = (sequelize, DataTypes) => {
  const Estoque = sequelize.define('Estoque', {
    idNatureza: DataTypes.NUMBER,
    idProduto: DataTypes.NUMBER,
    estoqueDisponivel: DataTypes.NUMBER,
    estoqueReservado: DataTypes.NUMBER
  }, {});
  Estoque.associate = function(models) {
    Estoque.hasOne(models.Natureza, {
      foreignKey: 'idNatureza',
      as: 'Natureza',
    })
    Estoque.hasOne(models.idProduto, {
      foreignKey: 'idProduto',
      as: 'Produto',
    })
  };
  return Estoque;
};