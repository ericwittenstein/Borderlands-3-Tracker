module.exports = (sequelize, Sequelize) => {
	const Item = sequelize.define("item", {
		name: {
			type: Sequelize.STRING,
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
		},
	});

	return Item;
};
