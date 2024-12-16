import { Model } from 'sequelize';

// MODELO DE PROVEEDORES
export default (sequelize, DataTypes) => {
  // Definición
  class Proveedor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación uno a muchos con compras
      Proveedor.hasMany(models.Compra, {
        foreignKey: 'proveedor_id',
        as: 'compras',
      });
    }
  }

  // Inicialización
  Proveedor.init(
    {
      nombre: {
        type: DataTypes.STRING(75),
        allowNull: false,
      },
      nit: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true,
      },
      direccion: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      telefono: {
        type: DataTypes.STRING(8),
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
      modelName: 'Proveedor',
      tableName: 'proveedores',
      timestamps: false,
    }
  );

  return Proveedor;
};
