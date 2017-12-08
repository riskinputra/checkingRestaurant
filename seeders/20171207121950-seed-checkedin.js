'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CheckedIns', [{
      RestaurantId: 1,
      UserId: 1,
      details: 'Wifinya kenceng',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      RestaurantId: 2,
      UserId: 1,
      details: 'Gratis internet',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkdelete('CheckedIns', null, {})
  }
};
