import { config } from 'dotenv';
import process from 'process';
import express, { json } from 'express';
import morgan from 'morgan';
import rutaRoles from './routes/roles.routes.js';
import rutaUsuarios from './routes/usuarios.routes.js';
import rutaProveedores from './routes/proveedores.routes.js';

// Configurar variables de entorno
config();

// Crear servidor
const app = express();

// Middleware para convertir el body en JSON
app.use(json());

app.use(morgan('dev'));

// Puerto del servidor
app.set('port', process.env.PORT || 3000);

// RUTAS
app.get('/', (req, res) => {
  res.send('Desafío 360 - API REST');
});

// -> Rutas de roles
app.use('/api', rutaRoles);
// -> Rutas de usuarios
app.use('/api', rutaUsuarios);
// -> Rutas de proveedores
app.use('/api', rutaProveedores);

export default app;
