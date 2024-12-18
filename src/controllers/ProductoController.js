import db from '../database/models/index.js';

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    // Consulta
    const productos = await db.Producto.findAll({
      attributes: {
        exclude: ['usuario_id', 'fecha_registro'],
      },
    });

    // Traer el nombre del tipo de producto
    for (const producto of productos) {
      const tipoProducto = await db.TipoProducto.findByPk(
        producto.tipo_producto_id
      );
      producto.tipo_producto_id = {
        id: tipoProducto.id,
        nombre: tipoProducto.nombre,
      };
    }

    // Respuesta
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Obtener un producto por ID
export const obtenerProducto = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta
    const producto = await db.Producto.findByPk(id);

    // Validación
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Traer el nombre del tipo de producto
    const tipoProducto = await db.TipoProducto.findByPk(
      producto.tipo_producto_id
    );
    producto.tipo_producto_id = {
      id: tipoProducto.id,
      nombre: tipoProducto.nombre,
    };

    // Traer el nombre del usuario
    const usuario = await db.Usuario.findByPk(producto.usuario_id);
    producto.usuario_id = {
      id: usuario.id,
      nombres: usuario.nombres + ' ' + usuario.apellidos,
    };

    // Respuesta
    res.status(200).json(producto);
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Crear un producto
export const crearProducto = async (req, res) => {
  try {
    const {
      nombre,
      tipo_producto_id,
      marca,
      codigo,
      precio_unitario,
      stock,
      usuario_id,
      foto,
    } = req.body;

    // Procedimiento almacenado
    const procedimiento =
      'EXEC sp_insertar_producto :nombre, :tipo_producto_id, :marca, :codigo, :precio_unitario, :stock, :estado, :usuario_id, :foto';

    // Crear producto
    await db.sequelize.query(procedimiento, {
      replacements: {
        nombre,
        tipo_producto_id,
        marca,
        codigo,
        precio_unitario,
        stock,
        estado: 1,
        usuario_id,
        foto,
      },
    });

    // Obtener el producto creado
    const producto = await db.Producto.findOne({
      where: { codigo },
    });

    // Respuesta
    res.status(201).json(producto);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Actualizar un producto
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre,
      tipo_producto_id,
      marca,
      codigo,
      precio_unitario,
      stock,
      foto,
    } = req.body;

    // Consulta
    const producto = await db.Producto.findByPk(id);

    // Validación
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Actualizar
    producto.nombre = nombre || producto.nombre;
    producto.tipo_producto_id = tipo_producto_id || producto.tipo_producto_id;
    producto.marca = marca || producto.marca;
    producto.codigo = codigo || producto.codigo;
    producto.precio_unitario = precio_unitario || producto.precio_unitario;
    producto.stock = stock || producto.stock;
    producto.foto = foto || producto.foto;

    // Guardar cambios
    await producto.save();

    // Respuesta
    res.status(200).json(producto);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Eliminar un producto
export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta
    const producto = await db.Producto.findByPk(id);

    // Validaciones
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Si el producto tiene compras
    const compras = await db.DetalleCompra.findAll({
      where: { producto_id: id },
    });

    if (compras.length) {
      return res.status(400).json({
        mensaje:
          'No se puede eliminar el producto porque tiene compras asociadas',
      });
    }

    // Si el producto tiene ventas
    const ventas = await db.DetalleVenta.findAll({
      where: { producto_id: id },
    });

    if (ventas.length) {
      return res.status(400).json({
        mensaje:
          'No se puede eliminar el producto porque tiene ventas asociadas',
      });
    }

    // Si el producto tiene órdenes
    const ordenes = await db.DetalleOrden.findAll({
      where: { producto_id: id },
    });

    if (ordenes.length) {
      return res.status(400).json({
        mensaje:
          'No se puede eliminar el producto porque tiene órdenes asociadas',
      });
    }

    // Eliminar
    await producto.destroy();

    // Respuesta
    res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Cambiar estado de un producto
export const cambiarEstadoProducto = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta
    const producto = await db.Producto.findByPk(id);

    // Validación
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Procedimiento almacenado
    const procedimiento = 'EXEC sp_cambiar_estado_producto :id, :estado';

    // Cambiar estado
    await db.sequelize.query(procedimiento, {
      replacements: {
        id: producto.id,
        estado: req.body.estado,
      },
    });

    producto.estado = req.body.estado;

    // Respuesta
    res.status(200).json(producto);
  } catch (error) {
    console.error('Error al cambiar el estado del producto:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
