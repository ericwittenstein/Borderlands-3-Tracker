// const router = require("express").Router();
// // const sequelize = require("../config/connection");

// const Item = require("../models/modelIndex");

// // routes start with '/api'
// router.post("/", async (req, res) => {
// 	// // validate
// 	// if (!req.body.item_name) {
// 	// 	res.status(400).send({
// 	// 		message: "Cannot be empty!",
// 	// 	});
// 	// 	return;
// 	// }
// 	try {
// 		// create item from input fields
// 		const item = await Item.create({
// 			name: req.body.name,
// 			item_type: req.body.item_type,
// 			element: req.body.element,
// 			effect: req.body.effect,
// 			notes: req.body.notes,
// 			recommended: req.body.recommended,
// 		});
// 		res.status(200).json(item);
// 	} catch (err) {
// 		res.status(400).json(err);
// 	}

// 	//return response of item
// 	// Item.create(item)
// 	// 	.then((data) => {
// 	// 		res.send(data);
// 	// 	})
// 	// 	.catch((err) => {
// 	// 		res.status(500).send({
// 	// 			message: err.message || "Error occured!",
// 	// 		});
// 	// 	});
// });

// // return all items
// router.get("/", async (req, res) => {
// 	try {
// 		// const name = req.params.name;
// 		const allItems = await Item.findAll();

// 		res.status(200).json(allItems);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// // return item by id
// router.get("/:id", async (req, res) => {
// 	try {
// 		const idToFind = Item.findByPk(req.params.id);

// 		if (!idToFind) {
// 			res.status(404).json({ message: "Cannot find by ID" });
// 			return;
// 		}

// 		res.status(200).json(idToFind);
// 	} catch (err) {
// 		res.status(500).json({
// 			message: "Cannot find for some reason for single ID",
// 		});
// 	}
// });

// // update existing item
// router.put("/:id", async (req, res) => {
// 	const idToUpdate = req.params.id;

// 	Item.update(req.body, {
// 		where: { id: idToUpdate },
// 	})
// 		.then((num) => {
// 			if (num == 1) {
// 				res.status(200).json({ message: "Successfully Updated" });
// 			} else {
// 				res.status(404).json({ message: "Was Not Updated" });
// 			}
// 		})
// 		.catch((err) => {
// 			res.status(500).json(err);
// 		});
// });

// // delete single item
// router.deleteOne = (req, res) => {
// 	const id = req.params.inputId;

// 	Item.destroy({
// 		where: { id: id },
// 	})
// 		.then((num) => {
// 			if (num == 1) {
// 				res.status(200).json({ message: "Successfully Deleted" });
// 			} else {
// 				res.status(404).json({ message: "Was Not Deleted" });
// 			}
// 		})
// 		.catch((err) => {
// 			res.status(500).json(err);
// 		});
// };

// // delete all items; ONLY USE IF ABSOLUTELY CERTAIN
// router.deleteAll = (req, res) => {
// 	Item.destroy({
// 		where: {},
// 		truncate: false,
// 	})
// 		.then((nums) => {
// 			res.status(200).json({ message: `${nums} Items were deleted!` });
// 		})
// 		.catch((err) => {
// 			res.status(500).json(err);
// 		});
// };

// // TODO: ADD PAGINATION HERE?

// module.exports = router;
