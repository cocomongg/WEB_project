module.exports = (sequelize, DataType) => {
    const Document = sequelize.define('documents', {
        title: {
            type: DataType.STRING,
            allowNull: false
        },
        content: {
            type: DataType.TEXT,
            allowNull: false
        },
        userId: {
            type: DataType.INTEGER,
            allowNull: false
        }
    });

    Document.associate = function(models) {
        models.Document.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            targetKey: 'id'
        });
    };

    return {
        Document
    };
};