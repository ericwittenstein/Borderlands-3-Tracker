module.exports = (app) => {
	const items = require("../controllers/controllerIndex");
	var router = require("express").Router();

	// create item route
	router.post("/", items.create);

	// retrieve all items route
	router.get("/", items.findAll);

	// retrieve one item
	router.get("/:id", items.findOne);

	// update an item
	router.put("/:id", items.update);

	// delete all items
	router.delete("/:", items.deleteAll);

	// delete one item
	router.delete("/:id", items.deleteOne);

	app.use("/api/items", router);
};
