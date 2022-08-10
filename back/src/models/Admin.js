// Model
module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
        id_admin: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: DataTypes.INTEGER,
            unique: true
        }
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return Admin;
};
