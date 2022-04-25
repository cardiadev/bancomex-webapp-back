"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Accounts",
      [
        {
          type: 1,
          dateCreate: new Date(),
          amount: 36721405057,
          state: true,
          clientId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          type: 2,
          dateCreate: new Date(),
          amount: 59084760819,
          state: true,
          clientId: 2,
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
