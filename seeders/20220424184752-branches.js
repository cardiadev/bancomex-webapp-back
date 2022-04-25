"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Branches",
      [
        {
          name: "Sucursal 1 - Patria",
          address: "Av. Patria 888, Col. Centro, C.P. 48756, Zapopan, Jalisco",
          ceo: "Alfredo Guzman y Rascon",
          description: "La primera sucursal de la empresa",
          security: "La empresa cuenta con una seguridad de nivel 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sucursal 2 - Colomos",
          address: "Av. Acueducto 4587, Col. Acueducto, C.P. 48756,  Zapopan, Jalisco",
          ceo: "Roberta Miroslaba Gutierrez Haz",
          description: "La primera sucursal de la empresa",
          security: "La empresa cuenta con una seguridad de nivel 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Branches", null, {});
  },
};
