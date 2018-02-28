// Requiring our models
var db = require("../models");
var bcrypt = require ("bcrypt");
// Routes
// =============================================================
module.exports = (app)=> {

  // Login method by user and password will find user if exist if not create new user. Not sure about code because of bcrypt.
  // Don't know how to add JSON Web Token
  app.post("api/login",(req, res)=>{
    
    db.user.findOrCreate(req.body,{where: {user_login: 'user_login',
                              user_passwd: 'user_passwd'
                              }
                      })
    .spread((user, created) => {
      console.log(user.get({
        plain: true
      }))
      console.log(created)
    });
  })  
  // GET route for getting all of the todos
  app.get("/api/info", (req, res)=> {
    // findAll returns all entries for a table when used with no options
    db.User.findAll({
      include: [db.Dog]
    }).then((dbDogs)=> {
      res.json(dbDogs); 
    });
  });

  // POST route for creating a new user wwith bcrypt 
  app.post("/api/userCreate", (req, res)=> {
    const user_login = req.body.user_login;
    const user_passwd = req.body.user_passwd;
    db.user.create({
      user_login: user_login,
      user_passwd: user_passwd
    })
      .then(newUser => {
        res.json(newUser);
      })
    /* db.user.create(req.body).then( db.user.beforeCreate((userData, options ) => {
      return bcrypt.hash("user_passwd", 10)
          .then(hash => {
              //user_passwd = hash;
             res.json(userData)  
          })
          .catch(err => { 
              throw new Error(); 
          }); 
      // Bcrypt Hash of password
      /* */
    // }) 
  });
  //});

  // PUT route for updating user and dogs. 
  app.put("/api/update", (req, res)=> {
    db.user.update(req.body, {
      where: {
        user_id: 'user_id', 
        user_passwd: 'user_passwd'
      }
    })
    .then((u)=> {
      res.json(u);
    });
  });

  app.put("/api/todos", (req, res)=> {
    db.Dog.update({
      dog_name: req.dog_name.text,
      breed: req.breed.text,
      sex: req.sex.text,
      age: req.age.text,
      dog_weight:  req.dog_weight.text,
      demeanor: req.demeanor.text,
      energylvl:   req.energylvl.text,
      size: req.size.text
    }, {
      where: {
        id: req.body.id
      }
    }).then((dbDogs)=> {
      res.json(dbDogs);
    });
  });
}
