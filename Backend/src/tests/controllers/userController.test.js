const request = require('supertest');
const express = require('express');
const sinon = require('sinon');
const { User, Profile } = require('../../models');
const { getUserProfile, updateUserProfile } = require('../../controllers/userController');

const app = express();
app.use(express.json());

app.get('/api/users/:user_id/profile', getUserProfile);
app.put('/api/users/:user_id/profile', updateUserProfile);

describe('User Controller', () => {

  afterEach(() => {
    sinon.restore();  // Restore the default sandbox after each test
  });

  describe('GET /api/users/:user_id/profile', () => {

    it('should return a user profile if it exists', async () => {
      const profile = { user_id: 1, full_name: 'Test User', bio: 'A short bio' };

      sinon.stub(Profile, 'findOne').resolves(profile); // Mock Profile.findOne to return a profile

      const res = await request(app)
        .get('/api/users/1/profile');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(profile);
    });

    it('should return 404 if the profile is not found', async () => {
      sinon.stub(Profile, 'findOne').resolves(null); // Mock Profile.findOne to return null

      const res = await request(app)
        .get('/api/users/1/profile');

      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe('Profile not found');
    });

    it('should return 500 on server error', async () => {
      sinon.stub(Profile, 'findOne').throws(new Error('Database error')); // Mock Profile.findOne to throw an error

      const res = await request(app)
        .get('/api/users/1/profile');

      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe('Server error');
    });
  });

  describe('PUT /api/users/:user_id/profile', () => {

    it('should update a user profile if it exists', async () => {
      const profile = {
        user_id: 1,
        full_name: 'Test User',
        bio: 'A short bio',
        update: sinon.stub().resolves({ user_id: 1, full_name: 'Updated User', bio: 'Updated bio' })
      };
  
      sinon.stub(Profile, 'findOne').resolves(profile); // Mock Profile.findOne to return the profile
  
      const res = await request(app)
        .put('/api/users/1/profile')
        .send({ full_name: 'Updated User', bio: 'Updated bio' });
  
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({ user_id: 1, full_name: 'Updated User', bio: 'Updated bio' });
    });
  
    it('should return 404 if the profile is not found', async () => {
      sinon.stub(Profile, 'findOne').resolves(null); // Mock Profile.findOne to return null
  
      const res = await request(app)
        .put('/api/users/1/profile')
        .send({ full_name: 'Updated User', bio: 'Updated bio' });
  
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe('Profile not found');
    });
  
    it('should return 500 on server error', async () => {
      sinon.stub(Profile, 'findOne').throws(new Error('Database error')); // Mock Profile.findOne to throw an error
  
      const res = await request(app)
        .put('/api/users/1/profile')
        .send({ full_name: 'Updated User', bio: 'Updated bio' });
  
      expect(res.statusCode).toBe(500);
      expect(res.body.error).toBe('Server error');
    });
  });
  
  });