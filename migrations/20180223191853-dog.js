'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.createTable('dog',{
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
    dog_name: {type: Sequelize.STRING,
        allowNull: false
    },
    breed: {type: Sequelize.STRING,
        allowNull: true
    },
    sex: {type: Sequelize.STRING,
        allowNull: false
    },
    age: {type: Sequelize.DATEONLY, 
        allowNull: false
    },
    dog_weight: {type: Sequelize.INTEGER,
        allowNull: false,
    },
    demeanor: {type: Sequelize.STRING,
        allowNull: false
    },
    energylvl: {type: Sequelize.STRING,
        allowNull:false
    },
    size: {type: Sequelize.STRING, /* sm, md, lg, xl */
        allowNull: false
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,

  })
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
