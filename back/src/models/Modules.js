// Model
module.exports = (sequelize, DataTypes) => {
    const Modules = sequelize.define('Modules', {
        id_modules: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_project: {
            type: DataTypes.INTEGER,
            unique: false
        },
        slider1: {
            type: DataTypes.STRING(250),
            unique: false
        },
        slider2: {
            type: DataTypes.STRING(250),
            unique: false
        },
        slider3: {
            type: DataTypes.STRING(250),
            unique: false
        },
        slider4: {
            type: DataTypes.STRING(250),
            unique: false
        },
        slider5: {
            type: DataTypes.STRING(250),
            unique: false
        },
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return  Modules;
};
