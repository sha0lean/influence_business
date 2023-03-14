// Model Verify
module.exports = (sequelize, DataTypes) => {
    const Verify = sequelize.define(
        "Verify",
        {
            id_verify: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_admin: {
                type: DataTypes.INTEGER,
                unique: true,
                allowNull: false,
                references: {
                    model: "Admins",
                    key: "id_admin",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            id_modules: {
                type: DataTypes.INTEGER,
                unique: true,
                allowNull: false,
                references: {
                    model: "Modules",
                    key: "id_modules",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            validation: {
                type: DataTypes.BOOLEAN,
                unique: false,
            },
        },
        {
            //don't add the attributes createdAt and updatedAt
            timestamps: false,
        }
    );

    return Verify;
};
