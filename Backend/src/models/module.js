'use strict';
module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define('Module', {
    module_id: {
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
    module_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order: DataTypes.INTEGER
  }, {});

  Module.associate = function(models) {
    Module.belongsTo(models.Course, { foreignKey: 'course_id' });
    Module.hasMany(models.Lesson, { foreignKey: 'module_id' });
    Module.hasMany(models.Assignment, { foreignKey: 'module_id' });
    Module.hasMany(models.ProgrammingAssignment, { foreignKey: 'module_id' }); // Add this to reference ProgrammingAssignment
  };

  return Module;
};
