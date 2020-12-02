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

const documentSchemas = require('./schema/document')(sequelize, Sequelize);
const userSchemas = require('./schema/user')(sequelize, Sequelize);

let db = Object.assign({}, documentSchemas, userSchemas);
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate)
        db[modelName].associate(db);
});

sequelize.sync().then(() => {
    console.log("SYNC COMPLETED");
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;