const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./src/models');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const courseRoutes = require('./src/routes/courseRoutes');
const moduleRoutes = require('./src/routes/moduleRoutes');
const lessonRoutes = require('./src/routes/lessonRoutes');
const assignmentRoutes = require('./src/routes/assignmentRoutes');
const programmingAssignmentRoutes = require('./src/routes/programmingAssignmentRoutes');
const assignmentSubmissionRoutes = require('./src/routes/assignmentSubmissionRoutes');
const discussionThreadRoutes = require('./src/routes/discussionThreadRoutes');
const postRoutes = require('./src/routes/postRoutes')
const lectureSummaries = require('./src/routes/lectureSummaryRoutes')
const resourceRoutes = require('./src/routes/resourceRoutes')
const qaSessionRoutes = require('./src/routes/qaSessionRoutes')


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api', courseRoutes);
app.use('/api', moduleRoutes); 
app.use('/api', lessonRoutes); 
app.use('/api', assignmentRoutes);
app.use('/api', programmingAssignmentRoutes);
app.use('/api', assignmentSubmissionRoutes);
app.use('/api', discussionThreadRoutes);
app.use('/api', postRoutes);
app.use('/api', lectureSummaries);
app.use('/api', resourceRoutes)
app.use('/api', qaSessionRoutes)

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });