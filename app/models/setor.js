'use strict';
module.exports = (sequelize, DataTypes) => {
  const Setor = sequelize.define('Setor', {
    id: DataTypes.NUMBER,
    idIntegracao: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {});
  Setor.associate = function(models) {
    // associations can be defined here
  };
  return Setor;
};