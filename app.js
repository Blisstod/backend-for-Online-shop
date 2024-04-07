require('dotenv').config()
const express = require('express')
const router = require('./src/routes');
const connectDB= require('./src/config/db')
const bodyParser = require("body-parser");

const app = express()
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', router);

connectDB();

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})