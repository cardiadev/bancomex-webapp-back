'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('CashBoxes', [{
        name: 'box1',
        status:'1',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('CashBoxes', null, {});
  }
};
