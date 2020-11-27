const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD,
    {
        host: 'localhost',
        dialect: 'mysql',
        define: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
            timestamps: true
        }
    }
);

const documents = require('./schema/document')(sequelize, Sequelize);
const users = require('./schema/user')(sequelize, Sequelize);

let db = {
    Document: documents,
    User: users
};
sequelize.sync().then(() => {
    console.log("SYNC COMPLETED");
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;