// Model Modules
module.exports = (sequelize, DataTypes) => {
    const Modules = sequelize.define('Modules', {
        id_modules: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sliders: {
            type: DataTypes.STRING(250),
            unique: false
        },
        name_sliders: {
            type: DataTypes.STRING(250),
            unique: false
        }
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return Modules;
};