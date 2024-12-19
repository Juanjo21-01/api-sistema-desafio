import { Router } from 'express';
import {
  crearVenta,
  obtenerVenta,
  obtenerVentas,
  cambiarEstadoVenta,
} from '../controllers/VentaController.js';

const router = Router();

// GET - Obtener todas las ventas
router.get('/ventas', obtenerVentas);

// GET - Obtener una venta por ID con su detalle
router.get('/ventas/:id', obtenerVenta);

// POST - Crear una venta con su detalle
router.post('/ventas', crearVenta);

// PATCH - Actualizar estado de una venta
router.patch('/ventas/cambiarEstado/:id', cambiarEstadoVenta);

export default router;
