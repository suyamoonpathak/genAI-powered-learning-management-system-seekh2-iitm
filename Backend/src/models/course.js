'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    course_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    course_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    instructor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    category: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {});

  Course.associate = function(models) {
    Course.belongsTo(models.User, { foreignKey: 'instructor_id' });
    Course.hasMany(models.Module, { foreignKey: 'course_id' });
    Course.hasMany(models.Assignment, { foreignKey: 'course_id' });
    Course.hasMany(models.ProgrammingAssignment, { foreignKey: 'course_id' });
    Course.hasMany(models.DiscussionThread, { foreignKey: 'course_id' });
    Course.hasMany(models.QASession, { foreignKey: 'course_id' });
    Course.belongsToMany(models.User, { through: 'UserCourses', foreignKey: 'course_id' });
  };

  return Course;
};
