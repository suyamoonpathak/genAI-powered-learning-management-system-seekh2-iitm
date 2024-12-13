'use strict';
module.exports = (sequelize, DataTypes) => {
  const Resource = sequelize.define('Resource', {
    resource_id: {
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
    resource_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resource_type: {
      type: DataTypes.ENUM('Video', 'Document', 'Link'),
      allowNull: false
    },
    resource_url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  Resource.associate = function(models) {
    Resource.belongsTo(models.Lesson, { foreignKey: 'lesson_id' });
  };

  return Resource;
};
