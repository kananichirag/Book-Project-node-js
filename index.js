// const mysql = require('mysql');
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(express.json());

// // Connection to MySql////////////////////////////////
// const con = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"Chirag@144",
//     database:"crud",
//     connectionLimit:2
// })
// con.connect((err) => {
//     if(err){
//         console.warn(err)
//     }else{
//         console.warn("connected")
//     }
// })
// //Get All/////////////////////////////////////////////
// app.get('/emp',(req,res) => {
//      con.query('select * from emp',(err,result) => {
//         if(err){
//             console.log(err)
//         }else{
//             res.send(result)
//         }
//      })
// })

// // Get By Id///////////////////////////////////
// app.get('/emp/:id',(req,res) => {
//     con.query('select * from emp where e_id=?',[req.params.id],(err,result) => {
//        if(err){
//            console.log(err)
//        }else{
//            res.send(result)
//        }
//     })
   
// })

// //Delete By Id//////////////////////////
// app.delete('/emp/:id',(req,res) => {
//     con.query('delete from emp where e_id=?',[req.params.id],(err,result) => {
//        if(err){
//            console.log(err)
//        }else{
//            res.send(result)
//        }
//     })
   
// })

// //Add User/////////////////////////////////////////////
// app.post('/emp',(req,res) => {
//     var emp = req.body;
//     var empData = [emp.e_id,emp.e_name,emp.e_salary];
//     con.query('INSERT INTO emp(e_id,e_name,e_salary) values(?)',[empData],(err,result) => {
//        if(err){
//            console.log(err)
//        }else{
//            res.send(result)
//        }
//     })
   
// })

// // Update USer///////////////////////////////////
// app.patch('/emp/update',(req,res) => {
//     var emp = req.body;
//     con.query('update emp  set  ? where e_id='+emp.e_id,[emp],(err,result) => {
//        if(err){
//            console.log(err)
//        }else{
//            res.send(result)
//        }
//     })
   
// })



// // Connection Of Server///////////////////////////////////
// app.listen(4000,() => console.log("server started"))    