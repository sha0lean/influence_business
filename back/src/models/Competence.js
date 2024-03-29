// Model Comptences
module.exports = (sequelize, DataTypes) => {
    const Competence = sequelize.define(
        "Competence",
        {
            id_competence: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_entrepreneur: {
                type: DataTypes.INTEGER,
                unique: false,
                allowNull: false,
                references: {
                    model: "Entrepreneurs",
                    key: "id_entrepreneur",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            id_modules: {
                type: DataTypes.INTEGER,
                unique: false,
                allowNull: false,
                references: {
                    model: "Modules",
                    key: "id_modules",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            name: {
                type: DataTypes.STRING(250),
                unique: false,
            },
            value: {
                type: DataTypes.FLOAT(10, 2),
                unique: false,
            },
            order: {
                type: DataTypes.INTEGER,
                unique: false,
            },
        },
        {
            //don't add the attributes createdAt and updatedAt
            timestamps: false,
        }
    );
    return Competence;
};
