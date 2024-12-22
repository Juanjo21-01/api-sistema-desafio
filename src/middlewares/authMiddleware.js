import { config } from 'dotenv';
import process from 'process';
import jwt from 'jsonwebtoken';
import db from '../database/models/index.js';

// Configurar variables de entorno
config();

// Verificar token
export const verificarToken = async (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ mensaje: 'No se proporcionó un token válido' });
    }

    // Extraer token
    const token = authHeader.split(' ')[1];

    // Verificar token
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    // Buscar usuario en base de datos
    const usuario = await db.Usuario.findByPk(decode.id);

    // Validar si el usuario existe
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Agregar usuario al request
    req.usuario = usuario;

    // Continuar con la petición
    next();
  } catch (error) {
    console.error('Error al verificar token:', error);
    return res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};

// Verificar roles
export const verificarRol = (roles = []) => {
  return (req, res, next) => {
    try {
      // Validar si el usuario tiene el rol necesario
      if (!roles.includes(req.usuario.rol_id)) {
        return res
          .status(403)
          .json({ mensaje: 'No tienes permiso para acceder a esta ruta' });
      }

      // Continuar con la petición
      next();
    } catch (error) {
      console.error('Error al verificar rol:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };
};
