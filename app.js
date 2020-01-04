const express = require("express");

const app = express();

const path = require("path");
global.appRoot = path.resolve(__dirname);

//cors
require("./startups/cors")(app);

// load globals
require("./startups/globals")();

//start the server
require("./startups/server")(app);

//database connection
require("./startups/db")();

//routing
require("./startups/routes")(app);
