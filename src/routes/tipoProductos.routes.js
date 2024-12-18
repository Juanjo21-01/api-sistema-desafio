import { Router } from 'express';

import {
  actualizarTipoProducto,
  cambiarEstadoTipoProducto,
  crearTipoProducto,
  eliminarTipoProducto,
  obtenerTipoProducto,
  obtenerTipoProductos,
} from '../controllers/TipoProductoController.js';

const router = Router();

// GET - Obtener todos los tipos de productos
router.get('/tipo-productos', obtenerTipoProductos);

// GET - Obtener un tipo de producto por ID
router.get('/tipo-productos/:id', obtenerTipoProducto);

// POST - Crear un tipo de producto
router.post('/tipo-productos', crearTipoProducto);

// PUT - Actualizar un tipo de producto
router.put('/tipo-productos/:id', actualizarTipoProducto);

// PATCH - Actualizar estado de un tipo de producto
router.patch('/tipo-productos/cambiarEstado/:id', cambiarEstadoTipoProducto);

// DELETE - Eliminar un tipo de producto
router.delete('/tipo-productos/:id', eliminarTipoProducto);

export default router;
