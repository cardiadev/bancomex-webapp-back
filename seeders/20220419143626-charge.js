'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Charges', [
        {
           name: 'Depositar',
           amount: 0,
           type: 'amount',
           createdAt: new Date(),
           updatedAt: new Date()
         },
         {
            name: 'Retirar',
            amount: 0.01,
            type: 'amount',
            createdAt: new Date(),
            updatedAt: new Date()
         },
         {
            name: 'Credito Hipotecario',
            amount: 5,
            type: 'percentage',
            createdAt: new Date(),
            updatedAt: new Date()
         },
      ], {});
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Charges', null, {});
    
  }
};
