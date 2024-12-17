'use strict';

/** @type {import('sequelize-cli').Migration} */

// Migración de la tabla de usuarios
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombres: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      apellidos: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      direccion: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      telefono: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      fecha_nacimiento: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      rol_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
      fecha_registro: {
        type: 'DATETIME',
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('GETDATE()'),
      },
    });
  },

  // Deshacer la migración
  async down(queryInterface) {
    await queryInterface.dropTable('usuarios');
  },
};
