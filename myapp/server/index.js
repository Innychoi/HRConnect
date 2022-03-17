const axios = require('axios');
const express = require('express');
const db = require('./models');

const app = express();
app.use(express.static('myapp/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/linkedin', db.getAll);
app.put('/linkedin', db.put);
app.post('/linkedin', db.post);
app.delete('/linkedin', db.delete);
app.post('/fetch', db.urlPost);

app.listen(5000, () => {
  console.log('listenig to 5000 ... ');
})


