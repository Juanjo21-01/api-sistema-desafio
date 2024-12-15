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
        type: DataTypes.DATE,
        allowNull: true,
      },
      rol_id: {
        type: DataTypes.INTEGER,
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
      modelName: 'Usuario',
      tableName: 'usuarios',
      timestamps: false,
    }
  );

  return Usuario;
};
