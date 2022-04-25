"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Beneficiaries",
      [
        {
          firstName: "Juan",
          lastName: "Perez",
          relation: "Hijo",
          porcentage: "50",
          birthDate: new Date(new Date().setFullYear(new Date().getFullYear() - 30)),
          phone: "3315468542",
          email: "juanrulfo@gmail.com",
          AccountId:1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Lucrecia",
          lastName: "Perez",
          relation: "Madre",
          porcentage: "50",
          birthDate: new Date(new Date().setFullYear(new Date().getFullYear() - 58)),
          phone: "3314754856",
          email: "lucrecidita@gmail.com",
          AccountId:1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Beneficiaries", null, {});
  },
};
