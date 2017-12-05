'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Restaurants', [{
      name: 'Hacktaurant',
      location: 'Arteri Pondok Indah',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Restaurant8',
      location: 'Kemanggisan',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Restaurants', null, {})
  }
};
