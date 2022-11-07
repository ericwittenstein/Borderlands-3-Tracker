// imports
const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");

// cors provides middleware request authentication and options
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

var corsOptions = {
	origin: "http://localhost:8001",
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

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () => {
		console.log(`Server is now running on port http://localhost:${PORT}`);
	});
});
