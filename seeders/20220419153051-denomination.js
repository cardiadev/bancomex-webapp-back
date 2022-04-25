'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Denominations', [
      {
        name: 'Billete 1000 pesos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Billete 500 pesos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Billete 200 pesos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Billete 100 pesos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Billete 50 pesos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Billete 20 pesos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Moneda 20 pesos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Moneda 10 pesos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Moneda 5 pesos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Moneda 2 pesos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Moneda 1 peso',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Moneda 50 centavos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Denominations', null, {});
   
  }
};
