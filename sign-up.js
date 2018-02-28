let con = require('../config/connection.js');
let bcrypt = require('bcrypt');

function addUser(userName, password, cb, res){
    bcrypt.hash(password, 5, function( err, bcryptedPassword) {
        let newPassword = bcryptedPassword;
        console.log(newPassword);

        let sql = `INSERT INTO dogOwner (user_login, user_passwd) VALUES ("${userName}", "${newPassword}");`

        con.query(sql, function (err, result) {
            if (err) throw err;
        });
    });
}

module.exports = addUser;