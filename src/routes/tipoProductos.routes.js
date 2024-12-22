import { Router } from 'express';
import { verificarToken, verificarRol } from '../middlewares/authMiddleware.js';
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
router.get('/', verificarToken, verificarRol([1, 2]), obtenerTipoProductos);

// GET - Obtener un tipo de producto por ID
router.get('/:id', verificarToken, verificarRol([1, 2]), obtenerTipoProducto);

// POST - Crear un tipo de producto
router.post('/', verificarToken, verificarRol([1]), crearTipoProducto);

// PUT - Actualizar un tipo de producto
router.put('/:id', verificarToken, verificarRol([1]), actualizarTipoProducto);

// PATCH - Cambiar estado de un tipo de producto
router.patch(
  '/cambiarEstado/:id',
  verificarToken,
  verificarRol([1]),
  cambiarEstadoTipoProducto
);

// DELETE - Eliminar un tipo de producto
router.delete('/:id', verificarToken, verificarRol([1]), eliminarTipoProducto);

export default router;
