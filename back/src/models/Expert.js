// Model Expert
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
        },
        presentation: {
            type: DataTypes.TEXT('long'),
            unique: false
        },
        experiences: {
            type: DataTypes.TEXT('long'),
            unique: false
        },
        work: {
            type: DataTypes.STRING(250),
            unique: false
        },
        diplomes: {
            type: DataTypes.STRING(250),
            unique: false
        },
        theme_interesting: {
            type: DataTypes.TEXT('long'),
            unique: false
        }
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return Expert;
};