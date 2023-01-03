// Model
module.exports = (sequelize, DataTypes) => {
    const Verify = sequelize.define('Verify', {
        id_verify: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_admin: {
            type: DataTypes.INTEGER,
            unique: true
        },
        id_modules: {
            type: DataTypes.INTEGER,
            unique: true
        },
        validation: {
            type: DataTypes.BOOLEAN,
            unique: false
        }
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return Verify;
};