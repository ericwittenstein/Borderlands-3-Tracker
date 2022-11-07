const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Item extends Model {}

Item.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
            unique: true,
			allowNull: false,
		},
		item_type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		element: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		effect: {
			type: DataTypes.STRING,
			allowNull: false,
		},
        notes: {
            type: DataTypes.STRING,
        },
		recommended: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: "item",
	}
);

module.exports = Item;
