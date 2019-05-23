'use strict';
module.exports = (sequelize, DataTypes) => {
  const Equipamento = sequelize.define('Equipamento', {
    id: DataTypes.NUMBER,
    idIntegracao: DataTypes.STRING,
    descricao: DataTypes.STRING,
    idSetor: DataTypes.NUMBER
  }, {});
  Equipamento.associate = function(models) {
    Equipamento.hasOne(models.Setor, {
      foreignKey: 'idSetor',
      as: 'Setor',
    })
  };
  return Equipamento;
};