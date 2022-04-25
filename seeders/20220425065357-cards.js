"use strict";

 function randomNumber(min, max) {
  const random =  Math.floor(Math.random() * (max - min)) + min;
  return random;
}
let cardFirstNumber = "41523134";
let minimo = 1000000000;
let maximo = 9999999999;

function generarTarjeta() {
  let cardNumber =  Number(cardFirstNumber + randomNumber(minimo, maximo));
  return cardNumber;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Cards",
      [
        {
          cardNumber: generarTarjeta(),
          nip: await randomNumber(1000, 9999),
          dateExpiration: new Date(new Date().setFullYear(new Date().getFullYear() + 4)),
          state: true,
          accountId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cardNumber: generarTarjeta(),
          nip: await randomNumber(1000, 9999),
          dateExpiration: new Date(new Date().setFullYear(new Date().getFullYear() + 4)),
          state: true,
          accountId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cards", null, {});
  },
};
