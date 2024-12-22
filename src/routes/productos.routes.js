import { Router } from 'express';
import { verificarToken, verificarRol } from '../middlewares/authMiddleware.js';
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
router.get('/', verificarToken, verificarRol([1, 2, 3]), obtenerProductos);

// GET - Obtener un producto por ID
router.get('/:id', verificarToken, verificarRol([1, 2, 3]), obtenerProducto);

// POST - Crear un producto
router.post('/', verificarToken, verificarRol([1, 2]), crearProducto);

// PUT - Actualizar un producto
router.put('/:id', verificarToken, verificarRol([1, 2]), actualizarProducto);

// PATCH - Cambiar estado de un producto
router.patch(
  '/cambiarEstado/:id',
  verificarToken,
  verificarRol([1, 2]),
  cambiarEstadoProducto
);

// DELETE - Eliminar un producto
router.delete('/:id', verificarToken, verificarRol([1]), eliminarProducto);

export default router;
