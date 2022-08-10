// Model
module.exports = (sequelize, DataTypes) => {
    const Propose = sequelize.define('Propose', {
        id_propose: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_project: {
            type: DataTypes.INTEGER,
            unique: false
        },
        price: {
            type: DataTypes.INTEGER,
            unique: false
        },
        id_investisor: {
            type: DataTypes.INTEGER
        },
        id_entrepreneur: {
            type: DataTypes.INTEGER
        }
        
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return  Propose;
};
