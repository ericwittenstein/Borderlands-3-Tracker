const { Item } = require("../../models");

// routes start with '/api/items'
exports.create = (req, res) => {
	// validate
	if (!req.body.item_name) {
		res.status(400).send({
			message: "Cannot be empty!",
		});
		return;
	}

	// create item
	const item = {
		name: req.body.inputName,
		item_type: req.body.inputType,
		element: req.body.inputElement,
		effect: req.body.inputEffect,
		notes: req.body.inputNotes,
		recommended: req.body.inputRec,
	};

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

exports.findAll = (req, res) => {
	Item.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send(err);
		});
};

exports.findOne = (req, res) => {
	const idFind = req.params.inputId;

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

exports.update = (req, res) => {
	const idUp = req.params.inputId;

	Item.update(req.body, {
		where: { idFind: idUp },
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

exports.deleteOne = (req, res) => {
	const idDel = req.params.inputId;

	Item.destroy({
		where: { idFind: idDel },
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
