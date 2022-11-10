// const app = require("express");
const router = require("express").Router();
const itemsRoutes = require("../controllers/controllerIndex");

router.use("/api", itemsRoutes);

// // create item route
// router.post("/", itemsRoutes.create);

// // retrieve all itemsRoutes route
// router.get("/", itemsRoutes.findAllItems);

// // retrieve one item
// router.get("/:id", itemsRoutes.findOne);

// // update an item
// router.put("/:id", itemsRoutes.update);

// // delete all itemsRoutes
// router.delete("/", itemsRoutes.deleteAll);

// // delete one item
// router.delete("/:id", itemsRoutes.deleteOne);

// 	app.use("/api/itemsRoutes", router);

module.exports = router;
