"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "BusinessUnits",
      [
        {
          name: "Unidad de Negocio 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Unidad de Negocio 2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("BusinessUnits", null, {});
  },
};
