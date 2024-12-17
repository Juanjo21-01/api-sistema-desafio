'use strict';

/** @type {import('sequelize-cli').Migration} */

require('dotenv').config();

const process = require('process');
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    await queryInterface.bulkInsert(
      'usuarios',
      [
        {
          nombres: process.env.ADMIN_NOMBRES,
          apellidos: process.env.ADMIN_APELLIDOS,
          email: process.env.ADMIN_EMAIL,
          password: password,
          estado: true,
          direccion: process.env.ADMIN_DIRECCION || null,
          telefono: process.env.ADMIN_TELEFONO,
          fecha_nacimiento: process.env.ADMIN_FECHA || null,
          rol_id: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      'usuarios',
      { email: process.env.ADMIN_EMAIL },
      {}
    );
  },
};
