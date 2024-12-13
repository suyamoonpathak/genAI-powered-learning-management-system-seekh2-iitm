'use strict';
module.exports = (sequelize, DataTypes) => {
  const QASession = sequelize.define('QASession', {
    session_id: {
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
    instructor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    session_date: DataTypes.DATE,
    topic: DataTypes.STRING,
    recording_url: DataTypes.STRING
  }, {});

  QASession.associate = function(models) {
    QASession.belongsTo(models.Course, { foreignKey: 'course_id' });
    QASession.belongsTo(models.User, { foreignKey: 'instructor_id' });
  };

  return QASession;
};
