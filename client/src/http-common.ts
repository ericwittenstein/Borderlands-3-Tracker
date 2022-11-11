import axios from "axios";

export default axios.create({
	url: "/api/",
	headers: {
		"Content-type": "application/json"
	}
});
