
// Dependencies

// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies

// =============================================================
var express = require("express");
var bodyParser = require('body-parser');
const path = require('path');

// Sets up the Express App
// =============================================================
var app = express();

var PORT = process.env.PORT || 3001;

// Requiring our models for syncing
var db = require("./models");

// Sets up all dependecies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
const staticFiles = express.static(path.join(__dirname, 'client', 'build'));

app.use(staticFiles);
// Routes
// =============================================================
require("./routes/api-routes.js")(app);

//app.use('/*', staticFiles);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
/*app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });*/
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({force:true}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
