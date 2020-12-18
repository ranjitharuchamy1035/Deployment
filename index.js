const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rtsIndex = require('./routes/index.routes');
const passport = require('passport');
const path = require('path');
const config = require('./Config/config');
const cron = require('cron').CronJob;
const { json } = require('express');
require('./models/db');
require('./Config/passport');
const app = express();

//middleware 
app.use(bodyParser.json());
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
    next();
  });
app.use(passport.initialize())
// app.use('public',express.static('public'))
app.use('/api', rtsIndex);
app.use("/",express.static(path.join(__dirname, '/Frontend-Angular')));
app.use(function(req, res) {
  res.sendFile(path.join(__dirname + '/Frontend-Angular', 'index.html')); // Set index.html as layout
});
let task = new cron('0 */1 * * *',() => {
  var date = new Date();
  console.log(date+" every one hour");
})
task.start();
// console.log(process.env.PORT)
//start server
app.listen(process.env.PORT, '0.0.0.0', () => console.log(`Server started at : ${process.env.PORT}`));
