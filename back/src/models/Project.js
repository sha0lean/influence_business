// Model
module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
        id_project: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        enterprise_status: {
            type: DataTypes.STRING(50),
            unique: false
        },
        description: {
            type: DataTypes.TEXT('long')
        },
        advancement: {
            type: DataTypes.TEXT('long')
        },
        motivation_IB: {
            type: DataTypes.TEXT('long')
        },
        project_type: {
            type: DataTypes.STRING(50)
        },
        id_entrepreneur: {
            type: DataTypes.INTEGER
        }
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return  Project;
};
