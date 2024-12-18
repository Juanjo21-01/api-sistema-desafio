import db from '../database/models/index.js';

// Obtener todos los tipos de productos
export const obtenerTipoProductos = async (req, res) => {
  try {
    // Consulta
    const tiposProductos = await db.TipoProducto.findAll({
      attributes: {
        exclude: ['fecha_registro'],
      },
    });

    // Respuesta
    res.status(200).json(tiposProductos);
  } catch (error) {
    console.error('Error al obtener los tipos de productos:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Obtener un tipo de producto por ID
export const obtenerTipoProducto = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta
    const tipoProducto = await db.TipoProducto.findByPk(id);

    // Validación
    if (!tipoProducto) {
      return res
        .status(404)
        .json({ mensaje: 'Tipo de producto no encontrado' });
    }

    // Respuesta
    res.status(200).json(tipoProducto);
  } catch (error) {
    console.error('Error al obtener el tipo de producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Crear un tipo de producto
export const crearTipoProducto = async (req, res) => {
  try {
    const { nombre } = req.body;

    // Procedimiento almacenado
    const procedimiento = 'EXEC sp_insertar_tipo_producto :nombre, :estado';

    // Crear tipo de producto
    await db.sequelize.query(procedimiento, {
      replacements: {
        nombre,
        estado: 1,
      },
    });

    // Obtener el tipo de producto creado
    const tipoProducto = await db.TipoProducto.findOne({
      where: { nombre },
    });

    // Respuesta
    res.status(201).json(tipoProducto);
  } catch (error) {
    console.error('Error al crear el tipo de producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Actualizar un tipo de producto
export const actualizarTipoProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    // Consulta
    const tipoProducto = await db.TipoProducto.findByPk(id);

    // Validación
    if (!tipoProducto) {
      return res
        .status(404)
        .json({ mensaje: 'Tipo de producto no encontrado' });
    }

    // Actualizar
    tipoProducto.nombre = nombre || tipoProducto.nombre;

    // Guardar cambios
    await tipoProducto.save();

    // Respuesta
    res.status(200).json(tipoProducto);
  } catch (error) {
    console.error('Error al actualizar el tipo de producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Eliminar un tipo de producto
export const eliminarTipoProducto = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta
    const tipoProducto = await db.TipoProducto.findByPk(id);

    // Validaciones
    if (!tipoProducto) {
      return res
        .status(404)
        .json({ mensaje: 'Tipo de producto no encontrado' });
    }

    // Si el tipo de producto tiene productos asociados
    const productos = await db.Producto.findAll({
      where: { tipo_producto_id: id },
    });

    if (productos.length > 0) {
      return res.status(400).json({
        mensaje:
          'No se puede eliminar el tipo de producto porque tiene productos asociados',
      });
    }

    // Eliminar
    await tipoProducto.destroy();

    // Respuesta
    res
      .status(200)
      .json({ mensaje: 'Tipo de producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el tipo de producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Cambiar estado de un tipo de producto
export const cambiarEstadoTipoProducto = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta
    const tipoProducto = await db.TipoProducto.findByPk(id);

    // Validación
    if (!tipoProducto) {
      return res
        .status(404)
        .json({ mensaje: 'Tipo de producto no encontrado' });
    }

    // Procedimiento almacenado
    const procedimiento = 'EXEC sp_cambiar_estado_tipo_producto :id, :estado';

    // Cambiar estado
    await db.sequelize.query(procedimiento, {
      replacements: {
        id,
        estado: req.body.estado,
      },
    });

    tipoProducto.estado = req.body.estado;

    // Respuesta
    res.status(200).json(tipoProducto);
  } catch (error) {
    console.error('Error al cambiar el estado del tipo de producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
