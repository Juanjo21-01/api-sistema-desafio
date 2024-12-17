import { Router } from 'express';
import { obtenerRol, obtenerRoles } from '../controllers/RolesController.js';

const router = Router();

// GET - Obtener todos los roles
router.get('/roles', obtenerRoles);

// GET - Obtener un rol por ID
router.get('/roles/:id', obtenerRol);

export default router;
