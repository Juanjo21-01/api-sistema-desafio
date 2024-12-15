import { Model } from 'sequelize';

// MODELO DE TIPO DE PRODUCTOS
export default (sequelize, DataTypes) => {
  // Definición
  class TipoProducto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación uno a muchos con la tabla de productos
      TipoProducto.hasMany(models.Producto, {
        foreignKey: 'tipo_producto_id',
        as: 'productos',
      });
    }
  }

  // Inicialización
  TipoProducto.init(
    {
      nombre: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      fecha_registro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'TipoProducto',
      tableName: 'tipo_productos',
      timestamps: false,
    }
  );

  return TipoProducto;
};
