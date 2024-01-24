// Create web server
// Create a web server that listens to incoming requests on port 3000. 
// When a request is received to the endpoint /comments, it should return an array of comments.
// The array should have 3 comments (you can come up with the comments yourself).
// Use the Express web framework to create the server.

const express = require('express');
const app = express();
const port = 3000;

const comments = [
    { id: 1, author: "John Doe", body: "Hello, world!" },
    { id: 2, author: "Jane Doe", body: "Hello, world!" },
    { id: 3, author: "Jim Doe", body: "Hello, world!" }
];

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});