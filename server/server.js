// express for restful api routing
const express = require("express");

// cors provides middleware request authentication and options
const cors = require("cors");

const app = express();

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

// set port for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is now running on port http://localhost:${PORT}`);
});
