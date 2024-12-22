import { Router } from 'express';
import { verificarToken, verificarRol } from '../middlewares/authMiddleware.js';
import {
  crearCompra,
  obtenerCompra,
  obtenerCompras,
  cambiarEstadoCompra,
} from '../controllers/CompraController.js';

const router = Router();

// GET - Obtener todas las compras
router.get('/', verificarToken, verificarRol([1, 2]), obtenerCompras);

// GET - Obtener una compra por ID con su detalle
router.get('/:id', verificarToken, verificarRol([1, 2]), obtenerCompra);

// POST - Crear una compra con su detalle
router.post('/', verificarToken, verificarRol([1, 2]), crearCompra);

// PATCH - Actualizar estado de una compra
router.patch(
  '/cambiarEstado/:id',
  verificarToken,
  verificarRol([1]),
  cambiarEstadoCompra
);

export default router;
