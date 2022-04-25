"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Guarantees",
      [
        {
          firstName: "Roberto",
          lastName: "Palazuelos",
          address: "Abedulez 245, Col. El Romero, Manzanillo, Colima",
          phone: "452145789",
          CreditId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Mercedes",
          lastName: "Palazuelos",
          address: "Abedulez 245, Col. El Romero, Manzanillo, Colima",
          phone: "4527458216",
          CreditId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Guarantees", null, {});
  },
};
