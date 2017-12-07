'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  });

  User.associate = models => {
    User.belongsToMany(models.Restaurant, {through: 'CheckedIn'})
  }

  return User;
};