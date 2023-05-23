const mongoose = require('mongoose');

const bookSchema =  new mongoose.Schema({
     title:{
        type:String,
        required:true
     },
     author_first_name:{
        type:String,
        required:true
     },
     author_last_name:{
        type:String,
        required:true
     },
     publisher:{
        type:String,
        required:true
     },
     publication_date:{
        type:Date,
        required:true
     },
     isbn:{
       type:String
     },
     genre:{
       type:String
     },
     language:{
        type:String,
        required:true
     },
     page_count:{
        type:Number,
        required:true
     },
     price:{
        type:Number,
        required:true
     },
     formate:{
         type:String
     },
     rating:{
      type:Number
     },
     country:{
        type:String,
        required:true
     }, 

})


const BookModel =new mongoose.model('book',bookSchema);
module.exports = BookModel;