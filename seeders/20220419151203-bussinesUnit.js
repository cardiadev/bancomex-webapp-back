'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('BusinessUnits', [{
        name: 'erererre',
        createdAt: new Date(),
        updatedAt: new Date()
        
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('BusinessUnits', null, {});
  }
};
