import axios from "axios";

export default axios.create({
	url: "/",
	headers: {
		"Content-type": "application/json"
	}
});
