const { Sequelize } = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.JAWSDB_URL) {
	sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
	const sequelize = new Sequelize(
		process.env.NAME,
		process.env.USER,
		process.env.PASSWORD,
		{
			host: "localhost",
			dialect: "mysql",
		}
	);
}

module.exports = sequelize;
