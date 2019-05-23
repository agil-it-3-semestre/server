'use strict';
module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    id: DataTypes.NUMBER,
    idIntegracao: DataTypes.STRING,
    descricao: DataTypes.STRING,
    unidadeMedida: DataTypes.STRING
  }, {});
  Produto.associate = function(models) {
    // associations can be defined here
  };
  return Produto;
};