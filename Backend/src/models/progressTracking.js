'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProgressTracking = sequelize.define('ProgressTracking', {
    progress_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Courses',
        key: 'course_id'
      }
    },
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Modules',
        key: 'module_id'
      }
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Lessons',
        key: 'lesson_id'
      }
    },
    completion_status: DataTypes.STRING
  }, {});

  ProgressTracking.associate = function(models) {
    ProgressTracking.belongsTo(models.User, { foreignKey: 'student_id' });
    ProgressTracking.belongsTo(models.Course, { foreignKey: 'course_id' });
    ProgressTracking.belongsTo(models.Module, { foreignKey: 'module_id' });
    ProgressTracking.belongsTo(models.Lesson, { foreignKey: 'lesson_id' });
  };

  return ProgressTracking;
};
