const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/index');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(3000, () => {
  console.log('Listening on Port 3000...');
  console.log('Goto: http://localhost:3000');
});
