// imports
const express = require("express");
const routes = require("./routes/routesIndex");
const sequelize = require("./config/connection");

// cors provides middleware request authentication and options
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

var corsOptions = {
	origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// test route
app.get("/", (req, res) => {
	res.json({ message: "Welcome!" });
});

app.use(routes);

const Item = require("./models/models");

// turn on connection to db and server
sequelize.sync({ force: true }).then(() => {
	app.listen(PORT, () => {
		console.log(`Server is now running on port http://localhost:${PORT}`);
	});
});
