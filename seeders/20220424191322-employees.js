"use strict";
const bcrypt = require('bcryptjs');
const saltBcrypt = 10;

let empleados = [
  {code: "E1001"},
  {code: "C1002"},
  {code: "G1003"}
];

async function passEncrypted(empleado){
  const crypt = await bcrypt.hash(empleado, saltBcrypt);
  return crypt;
}

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert(
      "Employees",
      [
        {
          firstName: "Carlos",
          lastName: "Diaz Flores",
          code: empleados[0].code,
          password: await passEncrypted(empleados[0].code),
          status: true,
          role: "Ejecutivo",
          BusinessUnitId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Roberto",
          lastName: "Zaragoza Hernandez",
          code: empleados[1].code,
          password: await passEncrypted(empleados[0].code),
          status: true,
          role: "Ejecutivo",
          BusinessUnitId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Daniel",
          lastName: "Flores Hermosillo",
          code: empleados[2].code,
          password: await passEncrypted(empleados[0].code),
          status: true,
          role: "Ejecutivo",
          BusinessUnitId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Employees", null, {});
  },
};
