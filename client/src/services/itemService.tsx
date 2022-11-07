import http from "../http-common";
import ItemData from "../types/itemTypes";

class ItemDataService {
	findAll() {
		return http.get<Array<ItemData>>("/items");
	}

	findOne(id: string) {
		return http.get<ItemData>(`/items/${id}`);
	}

    create(data: ItemData){
        return http.post<ItemData>("/items", data);
    }

    update( data: ItemData, id: any){
        return http.put<any>(`/items/${id}`, data);
    }

    deleteOne(id: any){
        return http.delete<any>(`/items/${id}`);
    }

    deleteAll(){
        return http.delete<any>(`/items`);
    }
}

export default new ItemDataService();