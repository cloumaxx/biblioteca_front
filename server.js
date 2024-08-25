const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist', 'biblioteca-front', 'browser')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'biblioteca-front', 'browser', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
