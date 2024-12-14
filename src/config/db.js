import { config } from 'dotenv';
import process from 'process';
import { Sequelize } from 'sequelize';

// Configurar variables de entorno
config();

// Crear conexión a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,
    // dialectOptions: {
    //   options: {
    //     encrypt: false,
    //     enableArithAbort: true,
    //   },
    // },
  }
);

// Conectar a la base de datos
const conexionBD = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con la base de datos');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

export { sequelize, conexionBD };
