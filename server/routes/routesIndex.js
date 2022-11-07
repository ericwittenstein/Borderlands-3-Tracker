const items = require("../controllers/api/apiIndex")
const router = require("express").Router();

module.exports = app => {
    router.post("/", items.create);
    router.get("/", items.findAll);
    router.get("/:id", items.findOne);
    router.put("/:id", items.update);
    router.delete("/:", items.deleteAll);
    router.delete("/:id", items.deleteOne);
    app.use("/api/items", router);
}