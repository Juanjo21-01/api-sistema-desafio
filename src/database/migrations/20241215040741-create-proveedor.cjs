'use strict';

/** @type {import('sequelize-cli').Migration} */

// Migración de la tabla de proveedores
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('proveedores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING(75),
        allowNull: false,
      },
      nit: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      direccion: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      telefono: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      fecha_registro: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  // Deshacer la migración
  async down(queryInterface) {
    await queryInterface.dropTable('proveedores');
  },
};
