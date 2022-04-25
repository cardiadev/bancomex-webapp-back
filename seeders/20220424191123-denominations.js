"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Denominations",
      [
        {
          name: "500",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "200",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "100",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "50",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "20",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "10",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "5",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "2 ",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Denominations", null, {});
  },
};
