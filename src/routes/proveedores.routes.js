import { Router } from 'express';
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
router.get('/proveedores', obtenerProveedores);

// GET - Obtener un proveedor por ID
router.get('/proveedores/:id', obtenerProveedor);

// POST - Crear un proveedor
router.post('/proveedores', crearProveedor);

// PUT - Actualizar un proveedor
router.put('/proveedores/:id', actualizarProveedor);

// PATCH - Actualizar estado de un proveedor
router.patch('/proveedores/cambiarEstado/:id', cambiarEstadoProveedor);

// DELETE - Eliminar un proveedor
router.delete('/proveedores/:id', eliminarProveedor);

export default router;
