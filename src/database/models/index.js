import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { sequelize } from '../../config/db.js';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    import(pathToFileURL(path.join(__dirname, file)).href).then(
      (modelModule) => {
        const model = modelModule.default(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
      }
    );
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
