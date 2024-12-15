'use strict';

/** @type {import('sequelize-cli').Migration} */

// Migración de la tabla de roles
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
    });
  },

  // Deshacer la migración
  async down(queryInterface) {
    await queryInterface.dropTable('roles');
  },
};
