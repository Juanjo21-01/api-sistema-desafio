'use strict';

import fs from 'fs';
import path from 'path';
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

console.log('sequelize', sequelize);

const __dirname = path.resolve();
const basename = path.basename(import.meta.url);
const db = {};

// Carga automática de modelos en la carpeta actual
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(async (file) => {
    const { default: modelInit } = await import(path.join(__dirname, file));
    const model = modelInit(sequelize, DataTypes);
    db[model.name] = model;
  });

// Configuración de asociaciones si existen
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = sequelize.constructor;

export default db;
