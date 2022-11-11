import axios from "axios";

export default axios.create({
	url: "/api/items/",
	headers: {
		"Content-type": "application/json"
	}
});
