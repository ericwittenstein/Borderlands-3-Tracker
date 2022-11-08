import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";

import ItemDataService from "../services/itemDataService";
import ItemData from "../types/itemTypes";

interface RouterProps {
	id: string;
}

type Props = RouteComponentProps<RouterProps>;

type State = {
	currentItem: ItemData;
	message: string;
};

export default class Item extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeType = this.onChangeType.bind(this);
		this.onChangeElement = this.onChangeElement.bind(this);
		this.onChangeEffect = this.onChangeEffect.bind(this);
		this.onChangeNotes = this.onChangeNotes.bind(this);
		this.onChangeRec = this.onChangeRec.bind(this);
		this.getItem = this.getItem.bind(this);
		this.updateItem = this.updateItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);

		this.state = {
			currentItem: {
				id: null,
				name: "",
				item_type: "",
				element: "",
				effect: "",
				notes: "",
				recommended: ""
			},
			message: ""
		};
	}

	componentDidMount() {
		this.getItem(this.props.match.params.id);
	}

	onChangeName(e: ChangeEvent<HTMLInputElement>) {
		const name = e.target.value;

		this.setState((prevState) => {
			return {
				currentItem: {
					...prevState.currentItem,
					name: name
				}
			};
		});
	}

	onChangeType(e: ChangeEvent<HTMLInputElement>) {
		const item_type = e.target.value;

		this.setState((prevState) => {
			return {
				currentItem: {
					...prevState.currentItem,
					item_type: item_type
				}
			};
		});
	}

	onChangeElement(e: ChangeEvent<HTMLInputElement>) {
		const element = e.target.value;

		this.setState((prevState) => {
			return {
				currentItem: {
					...prevState.currentItem,
					element: element
				}
			};
		});
	}

	onChangeEffect(e: ChangeEvent<HTMLInputElement>) {
		const effect = e.target.value;

		this.setState((prevState) => {
			return {
				currentItem: {
					...prevState.currentItem,
					effect: effect
				}
			};
		});
	}

	onChangeNotes(e: ChangeEvent<HTMLInputElement>) {
		const notes = e.target.value;

		this.setState((prevState) => {
			return {
				currentItem: {
					...prevState.currentItem,
					notes: notes
				}
			};
		});
	}

	onChangeRec(e: ChangeEvent<HTMLInputElement>) {
		const recommended = e.target.value;

		this.setState((prevState) => {
			return {
				currentItem: {
					...prevState.currentItem,
					recommended: recommended
				}
			};
		});
	}

	getItem(id: string) {
		ItemDataService.findOne(id)
			.then((response: any) => {
				this.setState({
					currentItem: response.data
				});
				console.log(response.data);
			})
			.catch((e: Error) => {
				console.log(e);
			});
	}

	updateItem() {
		ItemDataService.update(
			this.state.currentItem,
			this.state.currentItem.id
		)
			.then((response: any) => {
				console.log(response.data);
				this.setState({
					message: "Item updated successfully"
				});
			})
			.catch((e: Error) => {
				console.log(e);
			});
	}

    // DO NOT USE UNLESS ABSOLUTELY NECESSARY
    deleteItem(){
        ItemDataService.deleteOne(this.state.currentItem.id).then((response: any)=> {
            console.log(response.data);
            this.props.history.push("/items");
        }).catch((e:Error) => {
            console.log(e);
        });
    }

    // render(){
        
    // }
}
