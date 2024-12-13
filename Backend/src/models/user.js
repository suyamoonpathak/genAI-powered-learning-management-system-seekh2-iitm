const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('Student', 'TA', 'Instructor', 'Admin'),
      allowNull: false,
    },
  });

  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
  });

  User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  User.associate = function(models) {
    User.hasOne(models.Profile, { foreignKey: 'user_id' });
    User.belongsToMany(models.Course, { through: 'UserCourses', foreignKey: 'user_id' });
    User.hasMany(models.Submission, { foreignKey: 'student_id' });
    User.hasMany(models.ProgressTracking, { foreignKey: 'student_id' });
    User.hasMany(models.DiscussionThread, { foreignKey: 'created_by' });
  };

  return User;
};
