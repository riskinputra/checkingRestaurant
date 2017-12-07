'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'letmein',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'John Thor',
      email: 'john@thor.com',
      password: 'letmeout',
      role: 'owner',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'John son',
      email: 'john@son.com',
      password: 'letmego',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
