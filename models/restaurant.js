'use strict';
module.exports = (sequelize, DataTypes) => {
  var Restaurant = sequelize.define('Restaurant', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    territory: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING,
  });

  Restaurant.associate = models => {
    Restaurant.belongsToMany(models.User, {through: 'CheckedIn'})
  }

  return Restaurant;
};
