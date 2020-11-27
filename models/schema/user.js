module.exports = (sequelize, DataType) => {
    const User = sequelize.define('users', {
        username: {
            type: DataType.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataType.STRING,
            allowNull: false
        },
        name: {
            type: DataType.STRING,
            allowNull: false
        },
        birth: {
            type: DataType.DATE,
            allowNull: false
        },
        isMan: {
            type: DataType.BOOLEAN,
            allowNull: false,
        }
    });

    User.associate = function(models) {
        models.User.hasMany(models.Document);
    };

    return User;
};