"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "CashBoxes",
      [
        {
          name: "Caja 1",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Caja 2",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Caja 3",
          status: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CashBoxes", null, {});
  },
};
