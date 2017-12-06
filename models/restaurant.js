'use strict';
module.exports = (sequelize, DataTypes) => {
  var Restaurant = sequelize.define('Restaurant', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    territory: DataTypes.STRING,
    latitude: DataTypes.STRING,
    longitude: DataTypes.STRING
  });
  return Restaurant;
};