// Model Admin
module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define(
        "Admin",
        {
            id_admin: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_role: {
                type: DataTypes.INTEGER,
                unique: true,
                allowNull: false,
                references: {
                    model: "Roles",
                    key: "id_role",
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

    return Admin;
};
