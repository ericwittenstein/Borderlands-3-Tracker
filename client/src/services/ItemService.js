import http from "../http-common";

const getAll = () => {
	return http.get("/items");
};

const get = (id) => {
	return http.get(`/items/${id}`);
};

const create = (data) => {
	return http.post("/items", data);
};

const update = (data, id) => {
	return http.put(`/items/${id}`, data);
};

const remove = (id) => {
	return http.delete(`/items/${id}`);
};

const removeAll = () => {
	return http.delete(`/items`);
};

const findByName = (item_name) => {
	return http.get(`/items/?name=${item_name}`);
};

const ItemService = {
	getAll,
	get,
	create,
	update,
	remove,
	removeAll,
	findByName
};

export default ItemService;
