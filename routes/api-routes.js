// Requiring our models
const db = require("../models"), bcrypt = require ("bcrypt"), Sequelize = require('sequelize'), Op = Sequelize.Op;
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyD3M0WR0Z9a1lnWBnz6Fx3F-iaBTDYCJjo',
    Promise: Promise
  });

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'BarkerAppNW@gmail.com',
    pass: 'barkerpassword'
  }
});

let mailOptions1 = {
  from: 'BarkerAppNW@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: `You've got a match on Barker!`,
  text: 'That was easy!'
};

let mailOptions2 = {
  from: 'BarkerAppNW@gmail.com',
  to: 'myfriend@yahoo.com',
  subject: `You've got a match on Barker!`,
  text: 'That was easy!'
};

module.exports = app =>{
	app.post('/api/login', (req, res)=>{
        db.User.findOne({where: {user_login : req.body.user_login}
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
		db.User.findOne({where: {user_login : req.body.user_login}
        }).then((user)=>{
        	if (user) res.json(false);
        	else {
		        const {user_login, user_passwd} = req.body;
		        console.log(req.body);
		        bcrypt.hash(user_passwd, 10, (err, hash)=>{
		            console.log(hash);
		            db.User.create({user_login: user_login, user_passwd: hash})
		            .then(newUser => {
		                res.json(newUser);
		            })  
		        })
		    }
	    });
    });

    app.post('/api/newuser', (req, res)=>{
        let geoLocat, address = req.body.addr1 + ', ' + req.body.city + ', ' + req.body.state;
        googleMapsClient.geocode({address: address}).asPromise()
	        .then(response => {
	            console.log(response.json.results[0].geometry.location);
	            geocode = response.json.results[0].geometry.location;
	            geoLocat = { type: 'Point', coordinates: [geocode.lat, geocode.lng] }
	            console.log('\n\n');
	            console.log(geoLocat);
	        }).then(()=>{
	        	db.User.findOne({where: {id: req.body.userId}
		        })
		        .then(dbuser => {
		            dbuser.update({
		                fname: req.body.fname,
		                lname: req.body.lname,
		                addr1: req.body.addr1,
		                city: req.body.city,
		                state: req.body.state,
		                zip: req.body.zip,
		                image: req.body.image,
		                geoLocat: geoLocat,
		                owner_profile: req.body.owner_profile
		            }).then(updatedUser => {
		                db.Dog.create({
		                    owner_id: updatedUser.id,
		                    dog_name: req.body.dog_name,
		                    breed: req.body.breed,
		                    sex: req.body.sex,
		                    age: req.body.age,
		                    demeanor: req.body.demeanor,
		                    size: req.body.size
		                }).then(() => {
		                    res.json(updatedUser);
		                })
		            })      
		        })            
	        })
	        .catch((err)=>{
	            console.log(err)
	        }); 
    });

    /*app.post('/api/newuser', (req, res)=>{
        db.User.findOne({where: {id: req.body.userId}
        }).then((dbuser)=>{
            dbuser.update({
                fname: req.body.fname,
                lname: req.body.lname,
                addr1: req.body.addr1,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                image: req.body.image,
                owner_profile: req.body.owner_profile
            }).then(updatedUser =>{
                db.Dog.create({
                    owner_id: updatedUser.id,
                    dog_name: req.body.dog_name,
                    breed: req.body.breed,
                    sex: req.body.sex,
                    age: req.body.age,
                    demeanor: req.body.demeanor,
                    size: req.body.size
                }).then(() => {
                    res.json(updatedUser);
                })
            })
        })            
    });*/

	app.get('/api/profile/:id', (req, res)=>{
		db.User.findOne({ where: { id: req.params.id } })
			.then(dbUser => { db.Dog.findOne({ where: { owner_id: dbUser.id } }) 
				.then(dbDog => { res.json({user: dbUser, dog: dbDog}); 
			});
		});
	});

	/*app.post('/api/updateuser', (req, res)=> {
		db.User.findOne({ where: { id: req.body.userId } })
			.then(dbUser => { dbUser.update({ [req.body.val]: req.body.data })
				.then(user => { res.json(user);
			});
		});
	});*/

	app.post('/api/updateuser', (req, res)=> {
		let geoLocat;
		db.User.findOne({ where: { id: req.body.userId } })
			.then(dbUser => { dbUser.update({ [req.body.val]: req.body.data })
				.then(user => {
					let address = user.addr1 + ', ' + user.city + ', ' + user.state;
					googleMapsClient.geocode({address: address}).asPromise()
				        .then(response => {
				            console.log(response.json.results[0].geometry.location);
				            geocode = response.json.results[0].geometry.location;
				            geoLocat = { type: 'Point', coordinates: [geocode.lat, geocode.lng] }
				            console.log('\n\n');
				            console.log(geoLocat);
				        }).then(()=>{
				        		db.User.findOne({where: {id: req.body.userId}
					        })
					        .then(dbuser => {
					            dbuser.update({ geoLocat: geoLocat })
									.then(updatedUser => { res.json(updatedUser);
								});
							});
						});
				});
			});
	});

	app.post('/api/updatedog', (req, res)=> {
		db.Dog.findOne({ where: { owner_id: req.body.userId } })
			.then(dbDog => { dbDog.update({ [req.body.val]: req.body.data })
				.then(dog => { res.json(dog);
			});
		});
	});

	app.get('/api/matches/:id', (req, res)=>{
       db.User.findOne({
			where: {
			   id: req.params.id
			}
			}).then(user => {db.User.findAll({
			   where: {
			       id: {
			           [Op.ne]: req.params.id
			       }
			   },
			   attributes: ['id']
			}).then(ids => {res.json(ids);
       		});
        });
    });

	app.post('/api/matchlist', (req, res)=> {
		console.log("checking for match...");
		db.MatchList.findOne({ where: { user_id: req.body.userId, match: req.body.matchId } })
		.then(alreadyMatched => {
			if (!alreadyMatched) {
				db.MatchList.create({ 
					user_id: req.body.userId,
					match: req.body.matchId
				})
					.then(() => { db.MatchList.findOne({ where: { user_id: req.body.matchId, match: req.body.userId } })
						.then(match => {
							console.log("match found");
							if (match) gotMatch(req.body.userId, req.body.matchId);
							res.json(match ? true : false);
					});
				});
			}
			else {
				db.MatchList.findOne({ where: { user_id: req.body.matchId, match: req.body.userId } })
						.then(match => {
							console.log("match found");
							if (match) gotMatch(req.body.userId, req.body.matchId);
							res.json(match ? true : false);
					});
			}
		});
	});

	app.post('/api/matchcheck', (req, res)=> {
		db.MatchList.findOne({ where: { user_id: req.body.userId, match: req.body.matchId } })
		.then(match => { res.json(match ? true : false); });
	});

	gotMatch = (userId, matchId) => {
		console.log("got match");
		db.User.findOne({ where: { id: userId } })
			.then(user => {
				console.log("User data" + user);
				db.Dog.findOne({ where: { owner_id: userId } })
					.then(userDog => {
						console.log("User dog data" + userDog);
						db.User.findOne({ where: { id: matchId } })
							.then(match => {
								console.log("Match data" + match);
								db.Dog.findOne({ where: { owner_id: matchId } })
									.then(matchDog => {
										console.log("Match dog data" + matchDog);
										mailOptions1.to = user.user_login;
										mailOptions1.text = `You've been matched on Barker with ${match.fname} ${match.lname} and ${matchDog.dog_name}. Send them a message at ${match.user_login}!`;
										transporter.sendMail(mailOptions1, (error, info) => {
										  if (error) console.log(error);
										  else console.log('Email sent: ' + info.response);
										});
										mailOptions2.to = match.user_login;
										mailOptions2.text = `You've been matched on Barker with ${user.fname} ${user.lname} and ${userDog.dog_name}. Send them a message at ${user.user_login}!`;
										transporter.sendMail(mailOptions2, (error, info) => {
										  if (error) console.log(error);
										  else console.log('Email sent: ' + info.response);
										});
									});
							});
					});
			});
	}

};

