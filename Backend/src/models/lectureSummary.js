'use strict';
module.exports = (sequelize, DataTypes) => {
  const LectureSummary = sequelize.define('LectureSummary', {
    summary_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    lesson_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Lessons',
        key: 'lesson_id'
      }
    },
    ai_generated_summary: DataTypes.TEXT,
    manual_revision: DataTypes.TEXT
  }, {});

  LectureSummary.associate = function(models) {
    LectureSummary.belongsTo(models.Lesson, { foreignKey: 'lesson_id' });
  };

  return LectureSummary;
};
