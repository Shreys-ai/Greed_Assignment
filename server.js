const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to my Node.js server!');
  }

  else if (url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is a simple Node.js HTTP server created by Shreyas.');
  }

  else if (url === '/contact' && method === 'GET') {
    fs.readFile('./contact.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading contact page.');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }

  else if (url === '/contact' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const parsedData = querystring.parse(body);
      const existingData = fs.existsSync('contact-data.json')
        ? JSON.parse(fs.readFileSync('contact-data.json'))
        : [];

      existingData.push(parsedData);

      fs.writeFileSync('contact-data.json', JSON.stringify(existingData, null, 2));
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Thank you for contacting us!');
    });
  }

  else if (url === '/sample.jpg') {
    const imagePath = path.join(__dirname, 'sample.jpg');
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end('Image not found');
      }
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(data);
    });
  }

  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Page Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
