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
            unique: false
        },
        id_modules: {
            type: DataTypes.INTEGER,
            unique: false
        }
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return  Verify;
};
