import { Component, ChangeEvent } from "react";
import ItemDataService from "../services/itemService";
import { Link } from "react-router-dom";
import ItemData from "../types/itemTypes";

type Props = {};

// state variable types for this component
type State = {
	items: Array<ItemData>;
	currentItem: ItemData | null;
	currentIndex: number;
	searchName: string;
};

// react component for list of items
export default class ItemsList extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
        // bind the change events to the item props
		this.onChangeSearchName = this.onChangeSearchName.bind(this);
		this.retrieveItems = this.retrieveItems.bind(this);
		this.refreshList = this.refreshList.bind(this);
		this.setActiveItem = this.setActiveItem.bind(this);
		this.removeAllItems = this.removeAllItems.bind(this);
		this.searchName = this.searchName.bind(this);

        // initial state of the component
		this.state = {
			items: [],
			currentItem: null,
			currentIndex: -1,
			searchName: ""
		};
	}

    // if component mounted successfully, retrieve the list of items
	componentDidMount() {
		this.retrieveItems();
	}

    // tracker for value changes and assignment for search bar
	onChangeSearchName(e: ChangeEvent<HTMLInputElement>) {
		const searchName = e.target.value;

		this.setState({
			searchName: searchName
		});
	}

    // function to retrieve list of items
	retrieveItems() {
		ItemDataService.findAll()
			.then((response) => {
				this.setState({
					items: response.data
				});
				console.log(response.data);
			})
			.catch((e: Error) => {
				console.log(e);
			});
	}

    // function to refresh and reset the item list display
	refreshList() {
        this.retrieveItems();
        this.setState({
            currentItem: null,
            currentIndex: -1
        });
    }

    // function to designate the current item as active
    setActiveItem(item: ItemData, index: number){
        this.setState({
            currentItem: item,
            currentIndex: index
        });
    }

    // function to delete all items
    // DO NOT USE UNLESS ABSOLUTELY SURE
    removeAllItems(){
        ItemDataService.deleteAll().then((response: any) => {
            console.log(response.data);
            this.refreshList();
        }).catch((e: Error)=> {
            console.log(e);
        });
    }

    // function to handle the search by name feature
    searchName(){
        this.setState({
            currentItem: null,
            currentIndex: -1
        });

        ItemDataService.findByName(this.state.searchName).then((response: any)=> {
            this.setState({
                items: response.data
            });
            console.log(response.data);
        }).catch((e: Error) => {
            console.log(e);
        });
    }

    // render() {

    // }
}
