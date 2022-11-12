import http from "../http-common";
import ItemData from "../types/item.type";

class ItemDataService {
	getAll() {
		return http.get<Array<ItemData>>("/api/items");
	}

	get(id: string) {
		return http.get<ItemData>(`/api/items/${id}`);
	}

	create(data: ItemData) {
		return http.post<ItemData>("/api/items/", data);
	}

	update(data: ItemData, id: any) {
		return http.put<any>(`/api/items/${id}`, data);
	}

	delete(id: any) {
		return http.delete<any>(`/api/items/${id}`);
	}

	deleteAll() {
		return http.delete<any>(`/api/items`);
	}

	findByName(name: string) {
		return http.get<Array<ItemData>>(`/api/items/?name=${name}`);
	}
}

export default new ItemDataService();
