module.exports = (sequelize, Sequelize) => {
	const Item = sequelize.define("item", {
		item_name: {
			type: Sequelize.STRING,
			unique: true
		},
		item_type: {
			type: Sequelize.STRING,
		},
		element: {
			type: Sequelize.STRING,
		},
		effect: {
			type: Sequelize.STRING,
		},
		notes: {
			type: Sequelize.STRING,
		},
		recommended: {
			type: Sequelize.BOOLEAN,
		}
	});

	return Item;
};
