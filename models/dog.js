module.exports = function(sequelize, DataTypes) {
  var Dog = sequelize.define("Dog", {
id: {type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey:true
    },
    owner_id: {type: DataTypes.INTEGER,
        allowNull: false,
        REFERENCES: {model: "user",
                        key: "id"}
    },
    dog_name: {type: DataTypes.STRING,
        allowNull: false
    },
    breed: {type: DataTypes.STRING,
        allowNull: true
    },
    sex: {type: DataTypes.STRING,
        allowNull: false
    },
    age: {type: DataTypes.INTEGER, 
        allowNull: false
    },
    demeanor: {type: DataTypes.STRING,
        allowNull: false
    },
    size: {type: DataTypes.STRING, /* sm, md, lg, xl */
        allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    
  });
  return Dog;
};