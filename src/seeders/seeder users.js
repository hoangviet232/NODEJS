'use strict';

module.exports = {
  
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'viet',
      lastName: 'hoang',
      email: 'admin@gmail.com',
      password: NULL,
      address: 'vn',
      gender: 1,
      typeRole:'  ROLE',
      keyRole:'R1',

      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
