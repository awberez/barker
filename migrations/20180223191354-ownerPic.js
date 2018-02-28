'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.createTable('ownerPic', { 
    id: {type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey:true
    }, 
    owner_id: {type: Sequelize.INTEGER,
        allowNull: false,
        REFERENCES: {model: "user",
                      key: "id"}
    }, 
    pic_name: {type: Sequelize.STRING
    },
    pic_ref: {type: Sequelize.STRING
    },/*  -- for future use to store CDN reference */
    pic: {type: Sequelize.BLOB
    }, /* -- pic storage in database */
    // Timestamps
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
