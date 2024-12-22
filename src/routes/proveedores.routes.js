import { Router } from 'express';
import { verificarToken, verificarRol } from '../middlewares/authMiddleware.js';
import {
  actualizarProveedor,
  cambiarEstadoProveedor,
  crearProveedor,
  eliminarProveedor,
  obtenerProveedor,
  obtenerProveedores,
} from '../controllers/ProveedorController.js';

const router = Router();

// GET - Obtener todos los proveedores
router.get('/', verificarToken, verificarRol([1, 2]), obtenerProveedores);

// GET - Obtener un proveedor por ID
router.get('/:id', verificarToken, verificarRol([1, 2]), obtenerProveedor);

// POST - Crear un proveedor
router.post('/', verificarToken, verificarRol([1, 2]), crearProveedor);

// PUT - Actualizar un proveedor
router.put('/:id', verificarToken, verificarRol([1, 2]), actualizarProveedor);

// PATCH - Cambiar estado de un proveedor
router.patch(
  '/cambiarEstado/:id',
  verificarToken,
  verificarRol([1, 2]),
  cambiarEstadoProveedor
);

// DELETE - Eliminar un proveedor
router.delete('/:id', verificarToken, verificarRol([1]), eliminarProveedor);

export default router;
