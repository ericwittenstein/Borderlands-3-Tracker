const db = require("../models");
const Item = db.items;
const Op = db.Sequelize.Op;

// pagination setup to default feth 10 items and make the default page index 0
const getPagination = (page, size) => {
	const limit = size ? +size : 10;
	const offset = page ? page * limit : 0;

	return { limit, offset };
};

// function to map default response to necessary structure for pagination
const getPagingData = (data, page, limit) => {
	const { count: totalItems, rows: items } = data;
	const currentPage = page ? +page : 0;
	const totalPages = Math.ceil(totalItems / limit);

	return { totalItems, items, totalPages, currentPage };
};

// create and save new item
exports.create = (req, res) => {
	// create new item
	const item = {
		item_name: req.body.item_name,
		item_type: req.body.item_type,
		element: req.body.element,
		effect: req.body.effect,
		notes: req.body.notes,
		recommended: req.body.recommended ? req.body.recommended : false,
	};

	console.log("this is the req from the item controller: " + req);
	console.log("this is the item created from the req" + item);
	// validate request
	if (!req.body.item_name) {
		res.status(400).json({
			message: "Cannot be empty!",
		});
		return;
	}

	Item.create(item)
		.then((data) => {
			res.status(200).send(data);
		})
		.catch((err) => {
			res.status(500).json({
				message: `Something prevented the item from being created: ${err}`,
			});
		});
};

// retrieve all items from db
exports.findAll = (req, res) => {
	const { page, size, item_name } = req.query;
	var condition = item_name
		? { item_name: { [Op.like]: `%${item_name}%` } }
		: null;

	const { limit, offset } = getPagination(page, size);

	Item.findAndCountAll({ where: condition, limit, offset })
		.then((data) => {
			const response = getPagingData(data, page, limit);
			res.status(200).json(response);
		})
		.catch((err) => {
			res.status(500).json({
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
				res.status(200).json(data);
			} else {
				res.status(404).json({
					message: `Cannot find item at id=${id}`,
				});
			}
		})
		.catch((err) => {
			res.status(500).json({
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
				res.status(200).json({ message: "Item Successfully Updated" });
			} else {
				res.status(404).json({ message: "Was Not Updated" });
			}
		})
		.catch((err) => {
			res.status(500).json({
				message: `Something went wrong during the update: ${err}`,
			});
		});
};

// delete item by id
exports.delete = (req, res) => {
	const id = req.params.id;

	Item.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.status(200).json({ message: "Successfully Deleted" });
			} else {
				res.status(404).json({ message: "Was Not Deleted" });
			}
		})
		.catch((err) => {
			res.status(500).json({
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
			res.status(200).json({ message: `${nums} Items were deleted!` });
		})
		.catch((err) => {
			res.status(500).json({ message: `Something went wrong: ${err}` });
		});
};

// find all items that are recommended
exports.findAllRecommended = (req, res) => {
	const {page, size} = req.query;
	const {limit, offset} = getPagination(page, size);

	Item.findAndCountAll({ where: { recommended: true }, limit, offset })
		.then((data) => {
			const response = getPagingData(data, page, limit);
			res.status(200).json(response);
		})
		.catch((err) => {
			res.status(500).json({
				message: `Something went wrong while searching: ${err}`,
			});
		});
};
