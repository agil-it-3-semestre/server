'use strict';
module.exports = (sequelize, DataTypes) => {
  const Warehouse = sequelize.define('warehouse', {
    storageId: {
      type: DataTypes.INTEGER,
      unique: 'storage_item'
    },
    itemId: {
      type: DataTypes.INTEGER,
      unique: 'storage_item'
    },
    avaliableStock: DataTypes.INTEGER,
    reservedStock: DataTypes.INTEGER
  }, {});
  return Warehouse;
};