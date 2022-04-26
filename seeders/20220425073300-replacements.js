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
      "Replacements",
      [
        {
          date: new Date(),
          newCardNumber: generarTarjeta(),
          reason: "Tarjeta dañada",
          CardId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          date: new Date(),
          newCardNumber: generarTarjeta(),
          reason: "Robo de tarjeta",
          CardId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Replacements", null, {});
  },
};
