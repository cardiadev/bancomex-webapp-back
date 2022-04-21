'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('Branches', [{
      name: 'Sucursal 1',
      address:'Av. Patria 205',
      ceo:'Daniel',
      description:'cfffsjjj',
      security:'vdvvfvf',
      createdAt:'2022-04-19 09:49:46.019-06',
      updatedAt:'2022-04-19 09:49:46.019-06'


     }], {});
    
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Branches', null, {});
  }
};
