'use strict';
module.exports = (sequelize, DataTypes) => {
  const DiscussionThread = sequelize.define('DiscussionThread', {
    thread_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Courses',
        key: 'course_id'
      }
    },
    topic: DataTypes.STRING,
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    created_at: DataTypes.DATE
  }, {});

  DiscussionThread.associate = function(models) {
    DiscussionThread.belongsTo(models.Course, { foreignKey: 'course_id' });
    DiscussionThread.belongsTo(models.User, { foreignKey: 'created_by' });
    DiscussionThread.hasMany(models.Post, { foreignKey: 'thread_id' });
  };

  return DiscussionThread;
};
