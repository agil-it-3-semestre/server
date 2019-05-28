'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tipo_Manutencao = sequelize.define('Tipo_Manutencao', {
    idIntegracao: DataTypes.NUMBER,
    descricao: DataTypes.STRING
  }, {});
  Tipo_Manutencao.associate = function(models) {
    // associations can be defined here
  };
  return Tipo_Manutencao;
};