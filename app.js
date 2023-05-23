const express = require('express');
const mongoose = require('mongoose');
const mongodb = require('mongodb')
const path = require('path')
const app = express();
const indexRoute = require('./routes/indexrotes');
const bodyParser = require('body-parser');
require('dotenv').config({ path: path.join(__dirname, "./config/.env") });

app.use(express.json())
app.use(express.urlencoded({ extended: false }))



app.use('/v1', indexRoute);


mongoose.connect(process.env.MONGO_URL).then((e) => console.log("🚀 MongoDB Connected")).catch((err) => {
    console.log("error--->", err)
})
app.listen(process.env.PORT || 7000, () => console.log("Server Start"))