import { Router } from 'express';
import {
  actualizarProducto,
  cambiarEstadoProducto,
  crearProducto,
  eliminarProducto,
  obtenerProducto,
  obtenerProductos,
} from '../controllers/ProductoController.js';

const router = Router();

// GET - Obtener todos los productos
router.get('/productos', obtenerProductos);

// GET - Obtener un producto por ID
router.get('/productos/:id', obtenerProducto);

// POST - Crear un producto
router.post('/productos', crearProducto);

// PUT - Actualizar un producto
router.put('/productos/:id', actualizarProducto);

// PATCH - Actualizar estado de un producto
router.patch('/productos/cambiarEstado/:id', cambiarEstadoProducto);

// DELETE - Eliminar un producto
router.delete('/productos/:id', eliminarProducto);

export default router;
