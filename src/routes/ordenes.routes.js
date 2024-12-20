import { Router } from 'express';
import {
  crearOrden,
  obtenerOrden,
  obtenerOrdenes,
  cambiarEstadoOrden,
} from '../controllers/OrdenController.js';

const router = Router();

// GET - Obtener todas las órdenes
router.get('/ordenes', obtenerOrdenes);

// GET - Obtener una orden por ID con su detalle
router.get('/ordenes/:id', obtenerOrden);

// POST - Crear una orden con su detalle
router.post('/ordenes', crearOrden);

// PATCH - Actualizar estado de una orden
router.patch('/ordenes/cambiarEstado/:id', cambiarEstadoOrden);

export default router;
