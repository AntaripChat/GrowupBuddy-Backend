const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config(); 

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());


// Connect to MongoDB (remove the deprecated options)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,  // Ensure new URL parser is used
  useUnifiedTopology: true // Ensure MongoDB driver uses the new server discovery and monitoring engine
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const applicationRoutes = require('./routes/application');
const clubRoutes = require('./routes/club');
const educationRoutes = require('./routes/education');
const eventRoutes = require('./routes/event');
const gigRoutes = require('./routes/gig');
const hostRoutes = require('./routes/host');
const messageRoutes = require('./routes/message');
const networkRoutes = require('./routes/network');
const pageRoutes = require('./routes/pages');
const portfolioRoutes = require('./routes/portfolio');
const profileRoutes = require('./routes/profile');
const recruiterRoutes = require('./routes/recruiter');
const skillsRoutes = require('./routes/skills');
const testimonialRoutes = require('./routes/Testimonial');
const workExperienceRoutes = require('./routes/work-experience');  // Lowercased filename for consistency
const companyWorkedRoutes = require('./routes/companyWorked');  // Lowercased filename for consistency

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/educations', educationRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/hosts', hostRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/networks', networkRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/portfolios', portfolioRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/recruiters', recruiterRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/work-experience', workExperienceRoutes);
app.use('/api/company-worked', companyWorkedRoutes);

// Default route for handling undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : {} // Hide error stack in production
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
