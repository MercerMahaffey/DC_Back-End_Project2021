'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.posts.belongsTo(models.users, {foreignKey: 'userid'});
      models.posts.hasMany(models.comments, {foreignKey: 'postid'});
      models.posts.hasMany(models.likes, {foreignKey: 'postid'});
    }
  };
  posts.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    languages: DataTypes.STRING,
    userid: DataTypes.INTEGER,
    imgurl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};