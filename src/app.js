import { config } from 'dotenv';
import process from 'process';
import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import rutaRoles from './routes/roles.routes.js';
import rutaUsuarios from './routes/usuarios.routes.js';
import rutaProveedores from './routes/proveedores.routes.js';
import rutaTipoProductos from './routes/tipoProductos.routes.js';
import rutaProductos from './routes/productos.routes.js';
import rutaCompras from './routes/compras.routes.js';
import rutaOrdenes from './routes/ordenes.routes.js';
import rutaAuth from './routes/auth.routes.js';

// Configurar variables de entorno
config();

// Crear servidor
const app = express();

// CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Middleware para convertir el body en JSON
app.use(json());

app.use(morgan('dev'));

// Puerto del servidor
app.set('port', process.env.PORT || 3000);

// RUTAS
app.get('/', (req, res) => {
  res.send('Desafío 360 - API REST');
});

// -> Rutas de autenticación
app.use('/api/auth', rutaAuth);

// -> Rutas de roles
app.use('/api/roles', rutaRoles);
// -> Rutas de usuarios
app.use('/api/usuarios', rutaUsuarios);
// -> Rutas de proveedores
app.use('/api/proveedores', rutaProveedores);
// -> Rutas de tipo de productos
app.use('/api/tipo-productos', rutaTipoProductos);
// -> Rutas de productos
app.use('/api/productos', rutaProductos);
// -> Rutas de compras
app.use('/api/compras', rutaCompras);
// -> Rutas de órdenes
app.use('/api/ordenes', rutaOrdenes);

export default app;
