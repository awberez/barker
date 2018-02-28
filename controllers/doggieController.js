// Node Dependencies
const express = require('express');
const router = express.Router();
const models = require('../models'); // Pulls out the user Models


// Extracts the sequelize connection from the models object
const sequelizeConnection = models.sequelize;

// Sync the tables
//sequelizeConnection.sync();


// Create routes
// ----------------------------------------------------

// Index Redirect
router.get('/', (req, res) => {
  res.redirect('/index');
});



// Index Page (render all users to DOM)
router.get('/index', (req, res) => {

  // Sequelize Query to get all users from database 
  models.user.findAll().then((data) => {

    // Pass the returned data into a Handlebars object and then render it
    const hbsObject = { user: data };
    // console.log(data);
    res.render('index', hbsObject);

  })

});



// Create a New user
router.post('/user/create', (req, res) => {

  // Sequelize Query to add new user to database
  models.user.create(
    {
      user: req.body.user
      
    }
  ).then(()=>{
    // After the user is added to the database, refresh the page
    res.redirect('/index');
  });

});

// Sequelize Query to update a user
router.post('/user/update/:id', (req, res) => {
  
  // update selected user
  models.users.update({
    
  },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(() => {
    res.redirect('/index');
  });
});
// ----------------------------------------------------


// Export routes
module.exports = router;