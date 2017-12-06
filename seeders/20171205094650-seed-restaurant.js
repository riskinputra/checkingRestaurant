'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Restaurants', [{
      name: 'Hacktaurant',
      address: 'Jalan Sultan Iskandar Muda No.7, RT.5/RW.9, Kebayoran Lama Selatan, Kebayoran Lama, RT.5/RW.9, Kby. Lama Sel., Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240, Indonesia',
      territory: 'Kebayoran Lama',
      latitude: '-6.2607187',
      longitude: '106.78161620000003',
      teritory: 'Kebayoran Lama',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Restaurant8',
      address: 'Masjid Raya Pondok Indah, Jalan Sultan Iskandar Muda, RT.1/RW.16, Pondok Pinang, South Jakarta City, Jakarta',
      territory: 'Kebayoran Lama',
      latitude: '-6.261280',
      longitude: '106.782799',
      teritory: 'Kebayoran Lama',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Restaurants', null, {})
  }
};
