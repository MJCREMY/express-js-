const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Path to blog posts JSON
const postsFilePath = path.join(__dirname, 'data', 'posts.json');

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.get('/blog', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'blog.html'));
});

// Blog data API
app.get('/blog-data', (req, res) => {
  fs.readFile(postsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading posts.json:', err);
      return res.status(500).json({ error: 'Failed to load posts' });
    }
    res.json(JSON.parse(data));
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});