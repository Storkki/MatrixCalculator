'use strict'

const express = require('express');
const path = require('path');

const port = 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/matrices');
})

app.get('/matrices', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'pages', 'matrix.html'));
})


app.get('/graphs', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'pages', 'graph.html'));
})

app.listen(port, () => console.log(`Starting on ${port}`));