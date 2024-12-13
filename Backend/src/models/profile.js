'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Users',
        key: 'user_id'
      }
    },
    full_name: DataTypes.STRING,
    bio: DataTypes.TEXT,
    profile_picture: DataTypes.STRING,
    badges: DataTypes.STRING,
    e_portfolio: DataTypes.STRING,
    contact_info: DataTypes.STRING,
    language_preference: DataTypes.STRING
  }, {});

  Profile.associate = function(models) {
    Profile.belongsTo(models.User, { foreignKey: 'user_id' });
  };

  return Profile;
};
