// Create a web server
// Run: node comments.js
// Test: curl -d "comment=Hello" http://localhost:3000/comments

const http = require('http');
const url = require('url');
const qs = require('querystring');

const comments = [];

http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.setEncoding('utf-8');
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const params = qs.parse(body);
      comments.push(params.comment);
      res.end('ok\n');
    });
  } else if (req.method === 'GET') {
    res.end(comments.map((comment) => {
      return comment + '\n';
    }).join(''));
  }
}).listen(3000);
```

###