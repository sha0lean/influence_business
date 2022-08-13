// Model
module.exports = (sequelize, DataTypes) => {
    const Messages = sequelize.define('Messages', {
        id_message: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_entrepreneur: {
            type: DataTypes.INTEGER,
            unique: true
        },
        id_expert: {
            type: DataTypes.INTEGER,
            unique: true
        },
        message: {
            type: DataTypes.STRING(250),
            unique: false
        }
    })

    return  Messages;
};
