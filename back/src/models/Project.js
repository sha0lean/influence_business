// Model
module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
        id_project: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_modules: {
            type: DataTypes.INTEGER,
            unique: true
        },
        id_entrepreneur: {
            type: DataTypes.INTEGER,
            unique: true
        },
        enterprise_status: {
            type: DataTypes.STRING(50),
            unique: false
        },
        description: {
            type: DataTypes.TEXT('long'),
            unique: false
        },
        advancement: {
            type: DataTypes.STRING(50),
            unique: false
        },
        motivation_IB: {
            type: DataTypes.TEXT('long'),
            unique: false
        },
        project_type: {
            type: DataTypes.STRING(50),
            unique: false
        },
    }, {
        //don't add the attributes createdAt and updatedAt
        timestamps: false,
    })

    return Project;
};
