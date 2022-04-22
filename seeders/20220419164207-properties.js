'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Properties', [{
    file:'Escrituras casa',
    value:'500000',
    GuaranteeId:4,
    createdAt:'2022-04-19 09:49:46.019-06',
    updatedAt:'2022-04-19 09:49:46.019-06'


    }], {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Properties', null, {});
   
  }
};
