'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.resolve(__dirname, '../config/database.js'))[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const models = {
  Component:sequelize.import('./component'),
  Equipment:sequelize.import('./equipment'),
  Item:sequelize.import('./item'),
  MaintenanceOrder:sequelize.import('./maintenanceOrder'),
  Operation:sequelize.import('./operation'),
  Sector:sequelize.import('./sector'),
  Storage:sequelize.import('./storage'),
  UnitMeasurement:sequelize.import('./unitMeasurement'),
  User:sequelize.import('./user'),
  Warehouse:sequelize.import('./warehouse'),
};
//const models = {}
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = sequelize['import'](path.join(__dirname, file));
//     models[model.name] = model;
//   });



Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;