const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
let sequelize;

if (process.env.JAWSDB_URL) {
	sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
	sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
		host: dbConfig.HOST,
		dialect: dbConfig.dialect,
		operatorsAliases: 0,

		pool: {
			max: dbConfig.pool.max,
			min: dbConfig.pool.min,
			acquire: dbConfig.pool.aquire,
			idle: dbConfig.pool.idle,
		},
	});
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.items = require("./item.model.js")(sequelize, Sequelize);

module.exports = db;
