const Project = sequelize.define('DOG', {
    id: {type: Sequelized.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey:true
    },
    owner_id: {type: Sequelized.INT,
         allowNull: false,
         REFERENCES: {model: USER,
                        key: id}
    },
    dog_name: {type: Sequelized.STRING(50),
        allowNull: false
    },
    breed: {type: Sequelized.STRING(50),
        allowNull: true
    },
    sex: {type: Sequelized.STRING(1),
        allowNull: false
    },
    age: {type: Sequelized.DATEONLY, 
        allowNull: false
    },
    dog_weight: {type: Sequelized.INT,
        allowNull: false,
    },
    demeanor: {type: Sequelized.STRING(25),
        allowNull: false
    },
    energylvl: {type: Sequelized.STRING(25),
        allowNull:false
    },
    size: {type: Sequelized.STRING(2), /* sm, md, lg, xl */
        allowNull: false
    }  
})