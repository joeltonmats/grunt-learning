// copy this into your app.js
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('/', function (req, res, next) {
    res.render('index');
});

module.exports = app;


