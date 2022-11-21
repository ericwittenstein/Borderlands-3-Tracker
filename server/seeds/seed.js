// // create the connections to the models
// const db = require("../config/db.config");
// const Item = require("../models/item.model");

// // create the connections to the seed data
// const itemData = require("./itemData.json");

// // seed function
// const seedDatabase = async () => {
// 	await db.sequelize.sync({ force: true });

// 	await Item.bulkCreate(itemData);

// 	process.exit(0);
// };

// seedDatabase();
