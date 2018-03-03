var bcrypt = require ("bcrypt");

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    id: {type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey:true
    },
    user_login: {type: DataTypes.STRING,
        allowNull: false,
        validate: {isEmail: true
        }  
    },
    user_passwd: {type: DataTypes.STRING,
        allowNull: false,
    },
    fname: {type: DataTypes.STRING,
        aloowNull:true,
    },
    lname: {type: DataTypes.STRING,
        allowNull:true
    },
    addr1: {type: DataTypes.STRING,
        allowNull: true
    },
    addr2: {type: DataTypes.STRING,
        allowNull: true
    },
    city: {type: DataTypes.STRING(25),
        allowNull: true
    },
    state: {type: DataTypes.STRING(2),
        allowNull: true
    },
    zip: {type: DataTypes.STRING(10),
        allowNull: true
    },
    geoLocat:{
        type: DataTypes.Point,
        allowNull: true
    },
    owner_profile: {type: DataTypes.STRING,
        allowNull: true
    }, 
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    
  });
//   user.beforeCreate((user, options) => {
//         return bcrypt.hash(user.user_passwd, 10)
//             .then(hash => {
//                 user.user_passwd = hash;
//             })
//             .catch(err => { 
//                 throw new Error(); 
//             });
//     });
  /*  user.validate((user,options)=>{
       return bcrypt.compareSync(user.user_passwd, this.user_passwd)

   }) */
  return User;
};