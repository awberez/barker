
module.exports = (sequelize, DataTypes)=>{
const picOwner = sequelize.define('picOwner', {
    id: {type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey:true
    }, 
    owner_id: {type: DataTypes.INTEGER,
        allowNull: false,
        REFERENCES: {model: 'user',
                       key: 'id'}
    }, 
    pic_name: {type: DataTypes.STRING(50)
    },
    pic_ref: {type: DataTypes.STRING (50)
    },/*  -- for future use to store CDN reference */
    pic: {type: DataTypes.BLOB
    }, /* -- pic storage in database */

    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
});
return picOwner
}
