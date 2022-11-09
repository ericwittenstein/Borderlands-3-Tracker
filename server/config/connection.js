const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

if (process.env.JAWSDB_URL) {
	sequelize = new Sequelize(process.env.JAWSDB_URL);
	// console.log(`Server initialized with JAWSDB`);
} else {
	sequelize = new Sequelize(
		process.env.DB_NAME,
		process.env.DB_USER,
		process.env.DB_PASSWORD,
		{
			host: "localhost",
			dialect: "mysql",
			port: 3306,
		}
	);
	// console.log(`Server initialized with Sequelize ${process.env.DB_USER}`);
}

module.exports = sequelize;
