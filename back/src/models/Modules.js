// Model
module.exports = (sequelize, DataTypes) => {
    const Modules = sequelize.define('Modules', {
        id_modules: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        slider1: {
            type: DataTypes.INTEGER,
            unique: false
        },
        slider2: {
            type: DataTypes.INTEGER,
            unique: false
        },
        slider3: {
            type: DataTypes.INTEGER,
            unique: false
        },
        slider4: {
            type: DataTypes.INTEGER,
            unique: false
        },
        slider5: {
            type: DataTypes.INTEGER,
            unique: false
        }
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return Modules;
};