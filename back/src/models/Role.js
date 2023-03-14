// Model Role
module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
        "Role",
        {
            id_role: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            role_name: {
                type: DataTypes.STRING(50),
                unique: false,
            },
            id_user: {
                type: DataTypes.INTEGER,
                unique: true,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id_user",
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

    return Role;
};
