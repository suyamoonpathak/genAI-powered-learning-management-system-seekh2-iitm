const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const { User, Profile } = require('../../models');
const { register, login } = require('../../controllers/authController');

const app = express();
app.use(express.json());

app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

describe('Auth Controller', () => {

  afterEach(() => {
    sinon.restore();  // Restore the default sandbox here after each test
  });

  describe('POST /api/auth/register', () => {

    it('should register a new user and create a profile', async () => {
      const newUser = { user_id: 1, username: 'testuser', email: 'test@example.com', password: 'password123', role: 'student' };

      sinon.stub(User, 'findOne').resolves(null); // Mock User.findOne to return null
      sinon.stub(User, 'create').resolves(newUser); // Mock User.create to return the new user
      sinon.stub(Profile, 'create').resolves(); // Mock Profile.create to do nothing

      const res = await request(app)
        .post('/api/auth/register')
        .send({ username: 'testuser', email: 'test@example.com', password: 'password123', role: 'student' });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('User registered successfully');
    });

    it('should return 400 if user already exists', async () => {
      sinon.stub(User, 'findOne').resolves({ email: 'existing@example.com' }); // Mock User.findOne to return an existing user

      const res = await request(app)
        .post('/api/auth/register')
        .send({ username: 'testuser', email: 'existing@example.com', password: 'password123', role: 'student' });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('User already exists');
    });

    it('should return 500 on server error', async () => {
      sinon.stub(User, 'findOne').throws(new Error('Database error')); // Mock User.findOne to throw an error

      const res = await request(app)
        .post('/api/auth/register')
        .send({ username: 'testuser', email: 'error@example.com', password: 'password123', role: 'student' });

      expect(res.statusCode).toBe(500);
      expect(res.body.message).toBe('Server error');
    });
  });

  describe('POST /api/auth/login', () => {

    it('should login a user and return a token', async () => {
      const user = { user_id: 1, username: 'testuser', email: 'test@example.com', password: 'password123', role: 'student', validPassword: sinon.stub().resolves(true) };
      sinon.stub(User, 'findOne').resolves(user); // Mock User.findOne to return the user
      sinon.stub(jwt, 'sign').returns('fake-token'); // Mock jwt.sign to return a fake token

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBe('fake-token');
      expect(res.body.user).toEqual({ id: 1, username: 'testuser', email: 'test@example.com', role: 'student' });
    });

    it('should return 401 for invalid email or password', async () => {
      sinon.stub(User, 'findOne').resolves(null); // Mock User.findOne to return null (user not found)

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'nonexistent@example.com', password: 'wrongpassword' });

      expect(res.statusCode).toBe(401);
      expect(res.body.message).toBe('Invalid email or password');
    });

    it('should return 400 on server error', async () => {
      sinon.stub(User, 'findOne').throws(new Error('Database error')); // Mock User.findOne to throw an error

      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Database error');
    });
  });

});
