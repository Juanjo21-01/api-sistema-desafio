import { Model } from 'sequelize';

// MODELO DE PRODUCTOS
export default (sequelize, DataTypes) => {
  // Definición
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación muchos a uno con la tabla de tipo de productos
      Producto.belongsTo(models.TipoProducto, {
        foreignKey: 'tipo_producto_id',
        as: 'tipo_producto',
      });

      // Relación muchos a uno con la tabla de usuarios
      Producto.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario',
      });

      // Relación uno a muchos con la tabla de detalle de compras
      Producto.hasMany(models.DetalleCompra, {
        foreignKey: 'producto_id',
        as: 'detalle_compras',
      });

      // Relación uno a muchos con la tabla de detalle de ventas
      Producto.hasMany(models.DetalleVenta, {
        foreignKey: 'producto_id',
        as: 'detalle_ventas',
      });

      // Relación uno a muchos con la tabla de detalle de ordenes
      Producto.hasMany(models.DetalleOrden, {
        foreignKey: 'producto_id',
        as: 'detalle_ordenes',
      });
    }
  }

  // Inicialización
  Producto.init(
    {
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      tipo_producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      marca: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      codigo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      foto: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      fecha_registro: {
        type: 'DATETIME',
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Producto',
      tableName: 'productos',
      timestamps: false,
    }
  );

  return Producto;
};
