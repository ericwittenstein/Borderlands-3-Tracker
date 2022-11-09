const router = require("express").Router();
const apiRoutes = require("./api");
const sequelize = require("../config/connection");

const Item = require("../models/modelIndex");

// routes start with '/api/items'
exports.create = (req, res) => {
	// validate
	if (!req.body.item_name) {
		res.status(400).send({
			message: "Cannot be empty!",
		});
		return;
	}

	// create item from input fields
	const item = {
		name: req.body.name,
		item_type: req.body.item_type,
		element: req.body.element,
		effect: req.body.effect,
		notes: req.body.notes,
		recommended: req.body.recommended,
	};

	//return response of item
	Item.create(item)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Error occured!",
			});
		});
};

// return all items
exports.findAll = (req, res) => {
	Item.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
};

// return item by id
exports.findOne = (req, res) => {
	const idFind = req.params.id;

	Item.findByPk(idFind)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({ message: "Cannot find" });
			}
		})
		.catch((err) => {
			res.status(500).send({ message: "Cannot find" });
		});
};

// update existing item
exports.update = (req, res) => {
	const id = req.params.id;

	Item.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({ message: "Successfully Updated" });
			} else {
				res.send({ message: "Was Not Updated" });
			}
		})
		.catch((err) => {
			res.status(500).send({ message: "Error!" });
		});
};

// delete single item
exports.deleteOne = (req, res) => {
	const id = req.params.inputId;

	Item.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({ message: "Successfully Deleted" });
			} else {
				res.send({ message: "Was Not Deleted" });
			}
		})
		.catch((err) => {
			res.status(500).send({ message: "Error!" });
		});
};

// delete all items; ONLY USE IF ABSOLUTELY CERTAIN
exports.deleteAll = (req, res) => {
	Item.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.send({ message: `${nums} Items were deleted!` });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occured",
			});
		});
};

// TODO: ADD PAGINATION HERE?