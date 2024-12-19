import { Router } from 'express';
import {
  crearCompra,
  obtenerCompra,
  obtenerCompras,
  cambiarEstadoCompra,
} from '../controllers/CompraController.js';

const router = Router();

// GET - Obtener todas las compras
router.get('/compras', obtenerCompras);

// GET - Obtener una compra por ID con su detalle
router.get('/compras/:id', obtenerCompra);

// POST - Crear una compra con su detalle
router.post('/compras', crearCompra);

// PATCH - Actualizar estado de una compra
router.patch('/compras/cambiarEstado/:id', cambiarEstadoCompra);

export default router;
