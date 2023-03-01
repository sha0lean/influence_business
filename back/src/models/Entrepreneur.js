// Model Entrepreneur
module.exports = (sequelize, DataTypes) => {
    const Entrepreneur = sequelize.define(
        "Entrepreneur",
        {
            id_entrepreneur: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_role: {
                type: DataTypes.INTEGER,
                unique: true,
            },
            presentation: {
                type: DataTypes.TEXT('long'),
                unique: false
            },
            theme_interesting: {
                type: DataTypes.TEXT("long"),
                unique: false,
            },
            projectName: {
                type: DataTypes.STRING(250),
                unique: false,
            },
            projectTheme: {
                type: DataTypes.STRING(250),
                unique: false,
            },
            projectDescription: {
                type: DataTypes.STRING(250),
                unique: false,
            },
            projectValue: {
                type: DataTypes.STRING(250),
                unique: false,
            },
            montantInvestissement: {
                type: DataTypes.STRING(100),
                unique: false,
            },
            modulesValues: {
                type: DataTypes.STRING(100),
                unique: false,
            },
        },
        {
            //don't add the attributes createdAt and updatedAt
            timestamps: false,
        }
    );

    return Entrepreneur;
};
