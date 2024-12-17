'use strict';

/** @type {import('sequelize-cli').Migration} */

// Migración de la tabla de tipo de productos
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tipo_productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nombre: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      estado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      fecha_registro: {
        type: 'DATETIME',
        allowNull: false,
        defaultValue: queryInterface.sequelize.literal('GETDATE()'),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('tipo_productos');
  },
};
