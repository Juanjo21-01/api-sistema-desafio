import { Router } from 'express';
import { verificarToken, verificarRol } from '../middlewares/authMiddleware.js';
import {
  actualizarUsuario,
  cambiarEstadoUsuario,
  eliminarUsuario,
  obtenerUsuario,
  obtenerUsuarios,
} from '../controllers/UsuarioController.js';

const router = Router();

// GET - Obtener todos los usuarios
router.get('/', verificarToken, verificarRol([1, 2]), obtenerUsuarios);

// GET - Obtener un usuario por ID
router.get('/:id', verificarToken, verificarRol([1, 2]), obtenerUsuario);

// PUT - Actualizar un usuario
router.put('/:id', verificarToken, verificarRol([1, 2]), actualizarUsuario);

// PATCH - Cambiar estado de un usuario
router.patch(
  '/cambiarEstado/:id',
  verificarToken,
  verificarRol([1, 2]),
  cambiarEstadoUsuario
);

// DELETE - Eliminar un usuario
router.delete('/:id', verificarToken, verificarRol([1]), eliminarUsuario);

export default router;
