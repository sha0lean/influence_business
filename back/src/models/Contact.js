// Model
module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('Contact', {
        id_message: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        message: {
            type: DataTypes.STRING(750),
            unique: true
        },
        id_project: {
            type: DataTypes.INTEGER,
            unique: false
        },
        id_expert: {
            type: DataTypes.INTEGER,
            unique: false
        },
        id_entrepreneur: {
            type: DataTypes.INTEGER,
            unique: false
        }
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return  Contact;
};
