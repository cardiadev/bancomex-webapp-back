"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Properties",
      [
        {
          file: "Escrituras casa",
          value: "Valor de la propiedad",
          guaranteeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          file: "Escrituras del auto",
          value: "Valor de la propiedad",
          guaranteeId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Properties", null, {});
  },
};
