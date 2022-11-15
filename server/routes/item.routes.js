module.exports = app => {
	const items = require("../controllers/item.controller.js");
	const router = require("express").Router();

	// create new item
	router.post("/", items.create);

	// retrieve all items route
	router.get("/", items.findAll);

	// retrieve all recommended items
	router.get("/recommended", items.findAllRecommended);

	// retrieve one item
	router.get("/:id", items.findOne);

	// update an item
	router.put("/:id", items.update);

	// delete all items
	router.delete("/", items.deleteAll);

	// delete one item
	router.delete("/:id", items.delete);

	app.use("/api/items", router);
};
