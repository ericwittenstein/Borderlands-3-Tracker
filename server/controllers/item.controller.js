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
		recommended: req.body.recommended ? req.body.recommended : false,
	};

	Item.create(item)
		.then((data) => {
			res.status(200).send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: `Something prevented the item from being created: ${err}`,
			});
		});
};

// retrieve all items from db
exports.findAll = (req, res) => {
	const name = req.query.name;
	var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

	Item.findAll({ where: condition })
		.then((data) => {
			res.status(200).send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: `Something went wrong while trying to retrieve items: ${err}`,
			});
		});
};

// find one item by id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Item.findByPk(id)
		.then((data) => {
			if (data) {
				res.status(200).send(data);
			} else {
				res.status(404).send({
					message: `Cannot find item at id=${id}`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Something went wrong while tring to retrieve item id=${id}: ${err}`,
			});
		});
};

// update item by id
exports.update = (req, res) => {
	const id = req.params.id;

	Item.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.status(200).send({ message: "Item Successfully Updated" });
			} else {
				res.status(404).send({ message: "Was Not Updated" });
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Something went wrong during the update: ${err}`,
			});
		});
};

// delete item by id
exports.deleteOne = (req, res) => {
	const id = req.params.id;

	Item.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.status(200).send({ message: "Successfully Deleted" });
			} else {
				res.status(404).send({ message: "Was Not Deleted" });
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Something went wrong during the deletion process: ${err}`,
			});
		});
};

// delete all items
exports.deleteAll = (req, res) => {
	Item.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.status(200).send({ message: `${nums} Items were deleted!` });
		})
		.catch((err) => {
			res.status(500).send({ message: `Something went wrong: ${err}` });
		});
};

exports.findAllRecommended = (req, res) => {
	Item.findAll({ where: { recommended: true } })
		.then((data) => {
			res.status(200).send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: `Something went wrong while searching: ${err}`,
			});
		});
};
