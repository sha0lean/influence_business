// Model SousCompetence
module.exports = (sequelize, DataTypes) => {
    const SousCompetence = sequelize.define(
        "SousCompetence",
        {
            id_sous_competence: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            id_entrepreneur: {
                type: DataTypes.INTEGER,
                unique: false,
            },
            id_competence: {
                type: DataTypes.INTEGER,
                unique: false,
                allowNull: false,
                references: {
                    model: "Competences",
                    key: "id_competence",
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
            // 0-> non acquis , 1 -> en cours d'acquisition, 2 -> acquis
            acquisition: {
                type: DataTypes.INTEGER,
                unique: false,
            },
        },
        {
            //don't add the attributes createdAt and updatedAt
            timestamps: false,
        }
    );

    return SousCompetence;
};
