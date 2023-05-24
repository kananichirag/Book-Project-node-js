const express= require('express');
const BookRoute = express.Router();
const BookController = require('../controller/bookController');

// CRUD Opartion
BookRoute.get('/getall',BookController.GetAll);
BookRoute.get('/get/:id',BookController.FindByIsdn);
BookRoute.post('/add',BookController.Add);
BookRoute.put('/update/:id',BookController.FindAndUpdate);
BookRoute.delete('/delete/:id',BookController.deleteById);


// Filter
BookRoute.get('/filter',BookController.Filter1);
BookRoute.get('/filter2',BookController.Filter2);
BookRoute.get('/filter3',BookController.Filter3);
BookRoute.get('/filter4',BookController.Filter4);
BookRoute.get('/genre',BookController.Genre);





module.exports = BookRoute;
