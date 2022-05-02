"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Charges",
      [
        {
          name: "Depositar",
          amount: 0,
          active: true,
          type: 'amount',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Retirar",
          amount: 0.01,
          active: true,
          type: 'amount',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cargo 2",
          amount: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cargo 3",
          amount: 800,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Charges", null, {});
  },
};
