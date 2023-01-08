// Model
module.exports = (sequelize, DataTypes) => {
    const Entrepreneur = sequelize.define('Entrepreneur', {
        id_entrepreneur: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_role: {
            type: DataTypes.INTEGER,
            unique: true
        },
        description: {
            type: DataTypes.TEXT('long'),
            unique: false
        }
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return Entrepreneur;
};