import { Router } from 'express';
import { verificarToken, verificarRol } from '../middlewares/authMiddleware.js';
import {
  crearOrden,
  crearResponsableOrden,
  obtenerOrden,
  obtenerOrdenes,
  obtenerOrdenesCliente,
  cambiarEstadoOrden,
} from '../controllers/OrdenController.js';

const router = Router();

// GET - Obtener todas las órdenes
router.get('/', verificarToken, verificarRol([1, 2, 3]), obtenerOrdenes);

// GET - Obtener una orden por ID con su detalle
router.get('/:id', verificarToken, verificarRol([1, 2, 3]), obtenerOrden);

// GET - Obtener todas las órdenes de un cliente
router.get(
  '/cliente/:id',
  verificarToken,
  verificarRol([1, 2, 3]),
  obtenerOrdenesCliente
);

// POST - Crear una orden con su detalle
router.post('/', verificarToken, verificarRol([1, 2, 3]), crearOrden);

// PATCH - Actualizar estado de una orden
router.patch(
  '/cambiarEstado/:id',
  verificarToken,
  verificarRol([1, 2]),
  cambiarEstadoOrden
);

// POST - Crear un responsable de orden
router.post(
  '/responsable',
  verificarToken,
  verificarRol([1, 2]),
  crearResponsableOrden
);

export default router;
