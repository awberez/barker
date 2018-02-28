var LocalStrategy = require('passport-local').Strategy;


var User = require('../models/user.js');

module.exports = (passport) => {


	passport.serializeUser((user, done)=>{
		done(null, user.id);
	});

	passport.deserializeUser((id, done)=>{
		user.findById(id, (err, user)=>{
			done(err, user);
		});
	});


	passport.use('local-signup', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	(req, email, password, done)=>{
		process.nextTick(()=>{
			User.findOne({'local.user_login': email}, (err, user)=>{
				if(err)
					return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage', 'That email is already taken'));
				} else {
					var newUser = new User();
					newUser.local.user_login = email;
					newUser.local.user_passwrd = newUser.generateHash(password);

					newUser.save((err)=>{
						if(err)
							throw err;
						return done(null, newUser);
					})
				}
			})

		});
	}));

	passport.use('local-login', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		(req, email, password, done)=>{
			process.nextTick(()=>{
				User.findOne({ 'local.username': email}, (err, user)=>{
					if(err)
						return done(err);
					if(!user)
						return done(null, false, req.flash('loginMessage', 'No User found'));
					if(!user.validPassword(password)){
						return done(null, false, req.flash('loginMessage', 'invalid password'));
					}
					return done(null, user);

				});
			});
		}
	));


};
