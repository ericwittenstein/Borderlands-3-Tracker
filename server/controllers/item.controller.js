const db = require("../models");
const Item = db.items;
const Op = db.Sequelize.Op;

// create and save new item
exports.create = (req, res) => {
	// validate request
	if (!req.body.name) {
		res.status(400).send({
			message: "Needs to have a name!",
		});
		return;
	}

	// create new item
	const item = {
		name: req.body.name,
		item_type: req.body.item_type,
		element: req.body.element,
		effect: req.body.effect,
		notes: req.body.notes,
		recommended: req.body.recommended ? req.body.recommended : false
	};

    Item.create(item).then(data => {
        res.status(200).send(data);
    }).catch (err => {
        res.status(500).send({message: `Something prevented the item from being created: ${err}`});
    });
};

// retrieve all items from db
exports.findAll = (req, res) => {};

// find one item by id
exports.findOne = (req, res) => {};

// update item by id
exports.update = (req, res) => {};

// delete item by id
exports.delete = (req, res) => {};

// delete all items
exports.deleteAll = (req, res) => {};

exports.findAllRecommended = (req, res) => {};
