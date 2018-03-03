
module.exports = (sequelize, DataTypes)=>{
const picOwner = sequelize.define('picOwner', {
    id: {type: Sequelized.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey:true
    }, 
    owner_id: {type: Sequelized.INT,
        allowNull: false,
        REFERENCES: {model: 'user',
                       key: 'id'}
    }, 
    pic_name: {type: Sequelized.STRING(50)
    },
    pic_ref: {type: Sequelized.STRING (50)
    },/*  -- for future use to store CDN reference */
    pic: {type: Sequelized.BLOB
    }, /* -- pic storage in database */

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
});
return picOwner
}
