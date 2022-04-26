"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Accounts",
      [
        {
          type: "Debito",
          dateCreate: new Date(),
          amount: 10000000,
          state: true,
          ClientId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Debito",
          dateCreate: new Date(),
          amount: 126000,
          state: true,
          ClientId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: "Credito",
          dateCreate: new Date(),
          amount: 55000,
          state: true,
          ClientId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Accounts", null, {});
  },
};
