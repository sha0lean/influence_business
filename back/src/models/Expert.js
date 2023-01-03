// Model
module.exports = (sequelize, DataTypes) => {
    const Expert = sequelize.define('Expert', {
        id_expert: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_role: {
            type: DataTypes.INTEGER,
            unique: true
        }
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return Expert;
};
