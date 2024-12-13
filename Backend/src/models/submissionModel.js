'use strict';
module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define('Submission', {
    submission_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    assignment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Assignments',
        key: 'assignment_id'
      }
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    submission_content: DataTypes.TEXT,
    grade: DataTypes.STRING,
    feedback: DataTypes.TEXT,
    submitted_at: DataTypes.DATE
  }, {});

  Submission.associate = function(models) {
    Submission.belongsTo(models.Assignment, { foreignKey: 'assignment_id' });
    Submission.belongsTo(models.User, { foreignKey: 'student_id' });
  };

  return Submission;
};
