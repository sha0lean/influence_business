// Model Contact
module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define(
        "Contact",
        {
            id_first_role: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_second_role: {
                type: DataTypes.INTEGER,
                unique: true,
            },
            message: {
                type: DataTypes.STRING(250),
                unique: false,
            },
            author: {
                type: DataTypes.STRING(50),
                unique: false,
            },
            id_project: {
                type: DataTypes.INTEGER,
                unique: true,
                allowNull: false,
                references: {
                    model: "Projects",
                    key: "id_project",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        },
        {
            //don't add the attributes createdAt and updatedAt
            timestamps: false,
        }
    );

    return Contact;
};
