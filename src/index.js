import dotenv from 'dotenv';
import process from 'process';
import express, { json } from 'express';

// Configurar variables de entorno
dotenv.config();

// Crear servidor
const app = express();

// Middleware para convertir el body en JSON
app.use(json());

// Puerto del servidor
const PORT = process.env.PORT || 3000;

console.log(PORT);

// Rutas
app.get('/', (req, res) => {
  res.send('Hola mundo');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
