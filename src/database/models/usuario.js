import { Model } from 'sequelize';

// MODELO DE USUARIOS
export default (sequelize, DataTypes) => {
  // Definición
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación muchos a uno con la tabla de roles
      Usuario.belongsTo(models.Role, {
        foreignKey: 'rol_id',
        as: 'role',
      });

      // Relación uno a muchos con la tabla de productos
      Usuario.hasMany(models.Producto, {
        foreignKey: 'usuario_id',
        as: 'productos',
      });

      // Relación uno a muchos con la tabla de compras
      Usuario.hasMany(models.Compra, {
        foreignKey: 'usuario_id',
        as: 'compras',
      });

      // Relación uno a muchos con la tabla de ventas
      Usuario.hasMany(models.Venta, {
        foreignKey: 'usuario_id',
        as: 'ventas',
      });

      // Relación uno a muchos con la tabla de ordenes
      Usuario.hasMany(models.Orden, {
        foreignKey: 'cliente_id',
        as: 'ordenes',
      });
    }
  }

  // Inicialización
  Usuario.init(
    {
      nombres: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      apellidos: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      telefono: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      rol_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fecha_registro: {
        type: 'DATETIME',
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Usuario',
      tableName: 'usuarios',
      timestamps: false,
    }
  );

  return Usuario;
};
