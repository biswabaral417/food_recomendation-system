const dotenv = require('dotenv'); //always at top
dotenv.config({ path: './config.env' })//path to hidden data always at top
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const path = require('path');
const foodItems = require('./model/foodsSchema');



app.use(express.json());
app.use(cookieParser());
//variable hidden such as passwords connection

const PORT = process.env.PORT;

require('./db/conn')// adding db connection









app.use(require('./router/auth')) //route files authentications files
app.use(require('./router/foods'))//give foods data




//middleware
const middleware = (req, res, next) => {
  console.log("middleware");
  next();
}






app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});