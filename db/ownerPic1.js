const Project = sequelize.define('USER', {
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
    pic_name: {type: Sequelized.STRING(50)
    },
    pic_ref: {type: Sequelized.STRING (50)
    },/*  -- for future use to store CDN reference */
    pic: {type: Sequelized.BLOB
    }, /* -- pic storage in database */
})