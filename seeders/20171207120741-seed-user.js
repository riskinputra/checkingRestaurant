'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      name: 'John Doe',
      email: 'john@doe.com',
      password: '$2a$10$eHu/rnYCEzqRh9OBD4b5Su9f2iqN7MlAQAszq3RPADrjRuvIUe0zy',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'John Thor',
      email: 'john@thor.com',
      password: '$2a$10$eHu/rnYCEzqRh9OBD4b5Su9f2iqN7MlAQAszq3RPADrjRuvIUe0zy',
      role: 'owner',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'John son',
      email: 'john@son.com',
      password: '$2a$10$eHu/rnYCEzqRh9OBD4b5Su9f2iqN7MlAQAszq3RPADrjRuvIUe0zy',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
