// Requiring our models
var db = require("../models");
var bcrypt = require ("bcrypt");

module.exports = (app, passport)=>{
	app.post('/api/login', (req, res)=>{
        db.user.findOne({where: {user_login : req.body.user_login}
        }).then((user)=>{
            bcrypt.compare(req.body.user_passwd, user.user_passwd, (err, loginSuccess)=>{
               if (loginSuccess){ 
                   res.json(user)
                }
               else{
                    res.json(false)
               }
        
            })
        });
        
    });

	app.post('/api/signup', (req, res)=>{
		db.user.findOne({where: {user_login : req.body.user_login}
        }).then((user)=>{
        	if (user) res.json(false);
        	else {
		        const {user_login, user_passwd} = req.body;
		        console.log(req.body);
		        bcrypt.hash(user_passwd, 10, (err, hash)=>{
		            console.log(hash);
		            db.user.create({user_login: user_login, user_passwd: hash})
		            .then(newUser => {
		                res.json(newUser);
		            })   
		        })
		    }
	    });
    });

	app.get('/api/profile', isLoggedIn, (req, res)=>{
		res.render('profile.ejs', { user: req.user });
	});

	app.get('/api/:username/:password', (req, res)=>{
		var newUser = new User();
		newUser.local.username = req.params.username;
		newUser.local.password = req.params.password;
		console.log(newUser.local.username + " " + newUser.local.password);
		newUser.save((err)=>{
			if(err)
				throw err;
		});
		res.send("Success!");
	});

	app.get('/api/logout', (req, res)=>{
		req.logout();
		res.redirect('/');
	})
};

 const isLoggedIn = (req, res, next)=> {
	if(req.isAuthenticated()){
		return next();
	} 
	res.redirect('/api/login');
} 