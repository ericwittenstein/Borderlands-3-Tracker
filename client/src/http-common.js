import axios from "axios";

export default axios.create({
	baseURL: "https://bl3tracker.herokuapp.com/api",
	headers: {
		"Content-type": "application/json"
	}
});
