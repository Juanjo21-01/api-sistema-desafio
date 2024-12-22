import { Router } from 'express';
import { verificarToken, verificarRol } from '../middlewares/authMiddleware.js';
import {
  crearOrden,
  obtenerOrden,
  obtenerOrdenes,
  cambiarEstadoOrden,
} from '../controllers/OrdenController.js';

const router = Router();

// GET - Obtener todas las órdenes 
router.get('/', verificarToken, verificarRol([1, 2, 3]), obtenerOrdenes);

// GET - Obtener una orden por ID con su detalle 
router.get('/:id', verificarToken, verificarRol([1, 2, 3]), obtenerOrden);

// POST - Crear una orden con su detalle 
router.post('/', verificarToken, verificarRol([1, 2, 3]), crearOrden);

// PATCH - Actualizar estado de una orden 
router.patch(
  '/cambiarEstado/:id',
  verificarToken,
  verificarRol([1, 2]),
  cambiarEstadoOrden
);

export default router;
