// Model Project
module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define(
        "Project",
        {
            id_project: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_modules: {
                type: DataTypes.INTEGER,
                unique: true,
            },
            id_entrepreneur: {
                type: DataTypes.INTEGER,
                unique: true,
            },
            enterprise_status: {
                type: DataTypes.STRING(50),
                unique: false,
            },
            description: {
                type: DataTypes.TEXT("long"),
                unique: false,
            },
            advancement: {
                type: DataTypes.STRING(50),
                unique: false,
            },
            motivation_IB: {
                type: DataTypes.TEXT("long"),
                unique: false,
            },
            project_type: {
                type: DataTypes.STRING(1000),
                unique: false,
            },
            project_value: {
                type: DataTypes.STRING(250),
                unique: false,
            },
            montant_investissement: {
                type: DataTypes.STRING(50),
                unique: false,
            },
            project_name: {
                type: DataTypes.STRING(100),
                unique: false,
            },
        },
        {
            //don't add the attributes createdAt and updatedAt
            timestamps: false,
        }
    );

    return Project;
};
