import { Router } from 'express';
import { verificarToken, verificarRol } from '../middlewares/authMiddleware.js';
import { obtenerRol, obtenerRoles } from '../controllers/RolesController.js';

const router = Router();

// GET - Obtener todos los roles
router.get('/', verificarToken, verificarRol([1]), obtenerRoles);

// GET - Obtener un rol por ID
router.get('/:id', verificarToken, verificarRol([1]), obtenerRol);

export default router;
