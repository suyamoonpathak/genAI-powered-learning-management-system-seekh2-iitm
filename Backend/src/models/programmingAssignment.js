'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProgrammingAssignment = sequelize.define('ProgrammingAssignment', {
    programming_assignment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    module_id: {  // Change this to module_id
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Modules', // Reference the Module model
        key: 'module_id'
      }
    },
    problem_statement: DataTypes.TEXT,
    input_format: DataTypes.TEXT,
    output_format: DataTypes.TEXT,
    test_cases: DataTypes.TEXT
  }, {});

  ProgrammingAssignment.associate = function(models) {
    ProgrammingAssignment.belongsTo(models.Module, { foreignKey: 'module_id' }); // Change this to reference Module
  };

  return ProgrammingAssignment;
};
