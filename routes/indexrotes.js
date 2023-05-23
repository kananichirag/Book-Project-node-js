const express = require('express');
const v1 = express.Router();
const bookRoutes = require('../routes/bookroutes');

v1.use('/book',bookRoutes);


module.exports = v1;