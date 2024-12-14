import { config } from 'dotenv';
import process from 'process';
import express, { json } from 'express';
import morgan from 'morgan';

// Configurar variables de entorno
config();

// Crear servidor
const app = express();

// Middleware para convertir el body en JSON
app.use(json());

app.use(morgan('dev'));

// Puerto del servidor
app.set('port', process.env.PORT || 3000);

// Rutas
app.get('/', (req, res) => {
  res.send('Hola mundo ');
});

export default app;
