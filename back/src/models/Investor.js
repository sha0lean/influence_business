// Model
module.exports = (sequelize, DataTypes) => {
    const Investor = sequelize.define('Investor', {
        id_investor: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_role: {
            type: DataTypes.INTEGER,
            unique: false
        },
        theme_interesting: {
            type: DataTypes.TEXT('long'),
            unique: false
        },
        name_company: {
            type: DataTypes.STRING(100),
            unique: false
        },
        description: {
            type: DataTypes.STRING(250)
        }
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return Investor;
};