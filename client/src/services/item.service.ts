import http from "../http-common";
import ItemData from "../types/item.type";

class ItemDataService {
	getAll() {
		return http.get<Array<ItemData>>("/items");
	}

	get(id: string) {
		return http.get<ItemData>(`/items/${id}`);
	}

	create(data: ItemData) {
		return http.post<ItemData>("/items", data);
	}

	update(data: ItemData, id: any) {
		return http.put<any>(`/items/${id}`, data);
	}

	delete(id: any) {
		return http.delete<any>(`/items/${id}`);
	}

	deleteAll() {
		return http.delete<any>(`/items`);
	}

	findByName(name: string) {
		return http.get<Array<ItemData>>(`/items/?name=${name}`);
	}
}

export default new ItemDataService();
