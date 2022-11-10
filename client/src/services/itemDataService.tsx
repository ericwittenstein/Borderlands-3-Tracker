import http from "../http-common";
import ItemData from "../types/itemTypes";

class ItemDataService {
	findAll() {
		return http.get<Array<ItemData>>("/");
	}

	findOne(id: string) {
		return http.get<ItemData>(`/${id}`);
	}

    create(data: ItemData){
        return http.post<ItemData>("/", data);
    }

    update( data: ItemData, id: any){
        return http.put<any>(`/${id}`, data);
    }

    deleteOne(id: any){
        return http.delete<any>(`/${id}`);
    }

    deleteAll(){
        return http.delete<any>(`/`);
    }

    findByName(name: string){
        return http.get<Array<ItemData>>(`/?name=${name}`);
    }

}

export default new ItemDataService();