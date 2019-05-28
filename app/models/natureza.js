'use strict';
module.exports = (sequelize, DataTypes) => {
  const Natureza = sequelize.define('Natureza', {
    idIntegracao: DataTypes.STRING,
    descricao: DataTypes.STRING
  }, {});
  Natureza.associate = function(models) {
    // associations can be defined here
  };
  return Natureza;
};