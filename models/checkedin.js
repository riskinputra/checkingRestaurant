'use strict';
module.exports = (sequelize, DataTypes) => {
  var CheckedIn = sequelize.define('CheckedIn', {
    RestaurantId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    details: DataTypes.STRING
  });

  return CheckedIn;
};