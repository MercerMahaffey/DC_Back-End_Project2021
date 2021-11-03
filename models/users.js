'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.users.hasMany(models.comments, {foreignKey: 'userid'});
      models.users.hasMany(models.posts, {foreignKey: 'userid'});
      models.users.hasMany(models.likes, {foreignKey: 'userid'});
    }
  };
  users.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    github: DataTypes.STRING,
    languages: DataTypes.STRING,
    roleName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};