import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import * as serviceWorker from "./serviceWorker";
import { HashRouter } from "react-router-dom";
import "./index.css";
import "./App.css";

ReactDOM.render(
	<HashRouter>
		<App />
	</HashRouter>,
	document.getElementById("root")
);

// serviceWorker.register();
