'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    post_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    thread_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'DiscussionThreads',
        key: 'thread_id'
      }
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    content: DataTypes.TEXT,
    created_at: DataTypes.DATE
  }, {});

  Post.associate = function(models) {
    Post.belongsTo(models.DiscussionThread, { foreignKey: 'thread_id' });
    Post.belongsTo(models.User, { foreignKey: 'author_id' });
  };

  return Post;
};
