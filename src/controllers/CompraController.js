import db from '../database/models/index.js';

// Obtener todas las compras
export const obtenerCompras = async (req, res) => {
  try {
    // Consulta
    const compras = await db.Compra.findAll({
      attributes: {
        exclude: ['observaciones', 'fecha_registro'],
      },
    });

    // Traer el nombre del proveedor
    for (const compra of compras) {
      const proveedor = await db.Proveedor.findByPk(compra.proveedor_id);
      compra.proveedor_id = {
        id: proveedor.id,
        nombre: proveedor.nombre,
      };
    }

    // Traer el nombre del usuario
    for (const compra of compras) {
      const usuario = await db.Usuario.findByPk(compra.usuario_id);
      compra.usuario_id = {
        id: usuario.id,
        nombres: usuario.nombres + ' ' + usuario.apellidos,
      };
    }

    // Respuesta
    res.status(200).json(compras);
  } catch (error) {
    console.error('Error al obtener las compras:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Obtener una compra por ID con su detalle
export const obtenerCompra = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta
    const compra = await db.Compra.findByPk(id);

    // Validación
    if (!compra) {
      return res.status(404).json({ mensaje: 'Compra no encontrada' });
    }

    // Traer el nombre del proveedor
    const proveedor = await db.Proveedor.findByPk(compra.proveedor_id);
    compra.proveedor_id = {
      id: proveedor.id,
      nombre: proveedor.nombre,
    };

    // Traer el nombre del usuario
    const usuario = await db.Usuario.findByPk(compra.usuario_id);
    compra.usuario_id = {
      id: usuario.id,
      nombres: usuario.nombres + ' ' + usuario.apellidos,
    };

    // Consulta al detalle de compras
    const detalleCompras = await db.DetalleCompra.findAll({
      where: { compra_id: id },
    });

    // Traer el nombre del producto
    for (const detalleCompra of detalleCompras) {
      const producto = await db.Producto.findByPk(detalleCompra.producto_id);
      detalleCompra.producto_id = {
        id: producto.id,
        nombre: producto.nombre,
      };
    }

    const compraDetalle = {
      ...compra.toJSON(),
      detalles: detalleCompras,
    };

    // Respuesta
    res.status(200).json(compraDetalle);
  } catch (error) {
    console.error('Error al obtener la compra:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Crear una compra con su detalle
export const crearCompra = async (req, res) => {
  try {
    const { fecha_compra, observaciones, proveedor_id, usuario_id, detalles } =
      req.body;

    // Procedimiento almacenado de compra
    const procedimientoCompra =
      'EXEC sp_insertar_compra :fecha_compra, :estado, :observaciones, :proveedor_id, :usuario_id';

    // Crear compra
    await db.sequelize.query(procedimientoCompra, {
      replacements: {
        fecha_compra,
        estado: 1,
        observaciones,
        proveedor_id,
        usuario_id,
      },
    });

    // Obtener la compra creada
    const compra = await db.Compra.findOne({
      order: [['id', 'DESC']],
    });

    // Procedimiento almacenado de detalle de compra
    const procedimientoDetalleCompra =
      'EXEC sp_insertar_detalle_compra :compra_id, :producto_id, :cantidad, :precio_unitario';

    // Crear detalle de compra
    for (const detalle of detalles) {
      await db.sequelize.query(procedimientoDetalleCompra, {
        replacements: {
          compra_id: compra.id,
          producto_id: detalle.producto_id,
          cantidad: detalle.cantidad,
          precio_unitario: detalle.precio_unitario,
        },
      });
    }

    // Respuesta
    res
      .status(201)
      .json({ mensaje: 'Compra creada correctamente', data: compra });
  } catch (error) {
    console.error('Error al crear la compra:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Cambiar estado de una compra
export const cambiarEstadoCompra = async (req, res) => {
  try {
    const { id } = req.params;

    // Consulta
    const compra = await db.Compra.findByPk(id);

    // Validación
    if (!compra) {
      return res.status(404).json({ mensaje: 'Compra no encontrada' });
    }

    // Procedimiento almacenado
    const procedimiento = 'EXEC sp_cambiar_estado_compra :id, :estado';

    // Cambiar estado
    await db.sequelize.query(procedimiento, {
      replacements: {
        id: compra.id,
        estado: req.body.estado,
      },
    });

    compra.estado = req.body.estado;

    // Respuesta
    res.status(200).json(compra);
  } catch (error) {
    console.error('Error al cambiar el estado de la compra:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
