'use strict';
module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define('Lesson', {
    lesson_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    module_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Modules',
        key: 'module_id'
      }
    },
    lesson_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: DataTypes.TEXT,
    video_url: DataTypes.STRING,
    transcript: DataTypes.TEXT,
    summary: {   // Add this field
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {});

  Lesson.associate = function(models) {
    Lesson.belongsTo(models.Module, { foreignKey: 'module_id' });
    Lesson.hasMany(models.Resource, { foreignKey: 'lesson_id' });
    Lesson.hasOne(models.LectureSummary, { foreignKey: 'lesson_id' });
  };

  return Lesson;
};
