import { config } from 'dotenv';
import process from 'process';

// Configurar variables de entorno
config();

// Desarrollo
export const development = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_DATABASE || 'database_development',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: process.env.DB_CONNECTION || 'mssql',
};

// Pruebas
export const test = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME_TEST || 'database_test',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: process.env.DB_CONNECTION || 'mssql',
};

// Producción
export const production = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME_PROD || 'database_production',
  host: process.env.DB_HOST || '127.0.0.1',
  dialect: process.env.DB_CONNECTION || 'mssql',
};
