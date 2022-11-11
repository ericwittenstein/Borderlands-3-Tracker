import axios from "axios";

export default axios.create({
	url: "https://bl3tracker.herokuapp.com//api/items/",
	headers: {
		"Content-type": "application/json"
	}
});
