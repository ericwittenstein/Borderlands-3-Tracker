// imports
const express = require("express");
const routes = require("./routes/routesIndex");
const sequelize = require("./config/connection");
const Item = require("./models/modelIndex");
const path = require("path");

// cors provides middleware request authentication and options
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

var corsOptions = {
	origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// configure express routing to point to public folder
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// test route
// app.get("/", (req, res) => {
// 	res.json({ message: "Welcome!" });
// });
// app.get("*", (req, res) => {
// 	res.sendFile(path.join(publicPath, "index.html"));
// });

app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => {
		console.log(`Server is now running on port http://localhost:${PORT}`);
	});
});
