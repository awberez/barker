'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.createTable('user',{
    id: {type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey:true
    },
    user_login: {type: Sequelize.STRING,
        allowNull: false,
        validate: {isEmail: true
        }
        
    },
    user_passwd: {type: Sequelize.STRING(50),
        allowNull: false,
    },
    fname: {type: Sequelize.STRING,
        aloowNull:true,
    },
    lname: {type: Sequelize.STRING,
        allowNull:true
    },
    addr1: {type: Sequelize.STRING,
        allowNull: true
    },
    addr2: {type: Sequelize.STRING,
        allowNull: true
    },
    city: {type: Sequelize.STRING(25),
        allowNull: true
    },
    state: {type: Sequelize.STRING(2),
        allowNull: true
    },
    zip: {type: Sequelize.STRING(10),
        allowNull: true
    },
    owner_profile: {type: Sequelize.STRING,
        allowNull: true
    }, 
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
   });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
