const { User, Profile } = require('../models');

const getUserProfile = async (req, res) => {
  try {
    console.log('Request received to get user profile');
    const userId = req.params.user_id;
    console.log(`Fetching profile for user ID: ${userId}`);
    
    const profile = await Profile.findOne({
      where: { user_id: userId }
    });

    if (!profile) {
      console.log('Profile not found');
      return res.status(404).send({ error: 'Profile not found' });
    }

    console.log('Profile found:', profile);
    res.send(profile);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).send({ error: 'Server error' });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.user_id;
    console.log(`Updating profile for user ID: ${userId}`);

    const profile = await Profile.findOne({ where: { user_id: userId } });

    if (!profile) {
      console.log('Profile not found');
      return res.status(404).send({ error: 'Profile not found' });
    }

    const updatedProfile = await profile.update(req.body);
    console.log('Profile updated:', updatedProfile);

    res.send(updatedProfile);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).send({ error: 'Server error' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile
};
