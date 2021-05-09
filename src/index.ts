
import dotenv from 'dotenv'
var express = require("express"); 
var app = express();

// Instantiating the Express object.
dotenv.config();
var app = express();

// Handles whenever the root directory of the website is accessed.
app.get("/", function(req, res) {
  // Respond with Express
  res.send("Hello world!");
});

// Set app to listen on port 3000
app.listen(process.env.PORT, function() { 
   console.log("server is running on port " + process.env.PORT);
});
