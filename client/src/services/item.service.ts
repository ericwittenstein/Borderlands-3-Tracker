import http from "../http-common";
import ItemData from "../types/item.type";

const getAll = () => {
	return http.get<Array<ItemData>>("/items");
};

const get = (id: string) => {
	return http.get<ItemData>(`/items/${id}`);
};

const create = (data: ItemData) => {
	return http.post<ItemData>("/items", data);
};

const update = (data: ItemData, id: any) => {
	return http.put<any>(`/items/${id}`, data);
};

const remove = (id: any) => {
	return http.delete<any>(`/items/${id}`);
};

const removeAll = () => {
	return http.delete<any>(`/items`);
};

const findByName = (item_name: string) => {
	return http.get<Array<ItemData>>(`/items/?name=${item_name}`);
};

const ItemDataService = {
	getAll,
	get,
	create,
	update,
	remove,
	removeAll,
	findByName
};

export default ItemDataService;
