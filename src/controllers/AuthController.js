import db from '../database/models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import process from 'process';

// Configurar variables de entorno
config();

// Iniciar sesión
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const usuario = await db.Usuario.findOne({
      where: { email },
      attributes: {
        exclude: ['fecha_nacimiento', 'fecha_registro'],
      },
    });

    // Validación
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Validar contraseña
    const passwordValida = bcrypt.compareSync(password, usuario.password);

    if (!passwordValida) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Generar token de sesión
    const token = jwt.sign(
      { id: usuario.id, rol_id: usuario.rol_id },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.TOKEN_EXPIRATION || '24h',
      }
    );

    // Ocultar valores
    usuario.password = undefined;
    usuario.estado = undefined;
    usuario.direccion = undefined;
    usuario.telefono = undefined;

    // Respuesta
    res.status(200).json({
      mensaje: 'Sesión iniciada correctamente',
      usuario,
      access_token: token,
      token_type: 'Bearer',
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Registrar usuario
export const register = async (req, res) => {
  try {
    const {
      nombres,
      apellidos,
      email,
      password,
      direccion,
      telefono,
      fecha_nacimiento,
    } = req.body;

    // Validar si el usuario ya existe
    const usuarioExistente = await db.Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).json({
        mensaje: 'El correo electrónico ya está en uso, debes de utilizar otro',
      });
    }

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync(10);
    const passwordEncriptada = bcrypt.hashSync(password, salt);

    // Procedimiento almacenado
    const procedimiento =
      'EXEC sp_insertar_usuario :nombres, :apellidos, :email, :password, :estado, :direccion, :telefono, :fecha_nacimiento, :rol_id';

    // Crear usuario
    await db.sequelize.query(procedimiento, {
      replacements: {
        nombres,
        apellidos,
        email,
        password: passwordEncriptada,
        estado: 1,
        direccion,
        telefono,
        fecha_nacimiento,
        rol_id: 3,
      },
    });

    // Obtener el usuario creado
    const usuario = await db.Usuario.findOne({
      where: { email },
    });

    // Respuesta
    res
      .status(201)
      .json({ mensaje: 'Usuario registrado correctamente', usuario });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
