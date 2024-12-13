'use strict';
module.exports = (sequelize, DataTypes) => {
  const Assignment = sequelize.define('Assignment', {
    assignment_id: {
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
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    due_date: DataTypes.DATE
  }, {});

  Assignment.associate = function(models) {
    Assignment.belongsTo(models.Module, { foreignKey: 'module_id' });
    Assignment.hasMany(models.Submission, { foreignKey: 'assignment_id' });
  };

  return Assignment;
};
