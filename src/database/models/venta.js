import { Model } from 'sequelize';

// MODELO DE VENTAS
export default (sequelize, DataTypes) => {
  // Definición
  class Venta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación muchos a uno con usuarios
      Venta.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario',
      });

      // Relación uno a muchos con detalle de ventas
      Venta.hasMany(models.DetalleVenta, {
        foreignKey: 'venta_id',
        as: 'detalle_ventas',
      });
    }
  }

  // Inicialización
  Venta.init(
    {
      fecha_venta: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      observaciones: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Venta',
      tableName: 'ventas',
      timestamps: false,
    }
  );

  return Venta;
};
