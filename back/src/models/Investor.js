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
        }
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return Investor;
};
