import { Model } from 'sequelize';

// MODELO DE ROLES
export default (sequelize, DataTypes) => {
  // Definición
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación uno a muchos con la tabla de usuarios
      Role.hasMany(models.Usuario, {
        foreignKey: 'rol_id',
        as: 'usuario',
      });
    }
  }

  // Inicialización
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Role',
      tableName: 'roles',
      timestamps: false,
    }
  );

  return Role;
};
