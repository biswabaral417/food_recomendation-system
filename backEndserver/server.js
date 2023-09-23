const dotenv = require('dotenv'); //always at top
dotenv.config({ path: './config.env' })//path to hidden data always at top



const express = require('express');
const app = express();
const path = require('path');

const fs=require('fs')
const https = require('https');
const httpsOptions = {
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.crt')
};

const server = https.createServer(httpsOptions, app);


const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')


const foodItems = require('./model/foodsSchema');



app.use(express.json());
app.use(cookieParser());
//variable hidden such as passwords connection

const PORT = process.env.PORT;

require('./db/conn')// adding db connection

app.use(require('./router/auth')) //route files authentications files
app.use(require('./router/foods'))//give foods data
app.use(require('./router/admins'))//adminspecific stuff
app.use(require('./router/usergetOrder'))//user to see their order status
app.use(require('./router/addmodifyFoods'))//add or modify foods
app.use(require('./router/removeFoods'))//to remove foods
app.use(require('./router/deliveryguy/dvgregister'))//to register delivery guys
app.use(require('./router/deliveryguy/deliveryGuycurrentOrder'))//to register delivery guys
app.use(require('./router/deliveryguy/dvGchoseFromOrder'))//to chose from orders delivery guys
app.use(require('./router/deliveryguy/dvgGetOtwme'))//to chose from orders delivery guys
app.use(require('./router/deliveryguy/dvgDeliverAndPaid'))//to chose from orders delivery guys
 
//middleware
// const middleware = (req, res, next) => {
//   console.log("middleware");
//   next();
// }
//the avove commented stuf was example of middleware function


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (HTTPS)`);
});
