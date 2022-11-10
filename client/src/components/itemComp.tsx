import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";

import ItemDataService from "../services/itemDataService";
import ItemData from "../types/item.type";

interface RouterProps {
	id: string;
}

type Props = RouteComponentProps<RouterProps>;

// state variable types for this component
type State = {
	currentItem: ItemData;
	message: string;
};

// React component for detailed item page
export default class Item extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		// bind the change events to the item props
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeType = this.onChangeType.bind(this);
		this.onChangeElement = this.onChangeElement.bind(this);
		this.onChangeEffect = this.onChangeEffect.bind(this);
		this.onChangeNotes = this.onChangeNotes.bind(this);
		this.onChangeRec = this.onChangeRec.bind(this);
		this.getItem = this.getItem.bind(this);
		this.updateItem = this.updateItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);

		// initial state of the component
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

	// if component mounted successfully, retrieve the item's details
	componentDidMount() {
		this.getItem(this.props.match.params.id);
	}

	// trackers for value changes and assignments
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

	// function to get item by id
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

	// function to push the new info to the item at the existing item id
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
	deleteItem() {
		ItemDataService.deleteOne(this.state.currentItem.id)
			.then((response: any) => {
				console.log(response.data);
				this.props.history.push("/items");
			})
			.catch((e: Error) => {
				console.log(e);
			});
	}

	render() {
		const { currentItem } = this.state;

		return (
			<div>
				{currentItem ? (
					<div className="edit-form">
						<h4>Item</h4>
						<form>
							<div className="form-group">
								<label htmlFor="name">Name</label>
								<input
									type="text"
									className="form-control"
									id="name"
									value={currentItem.name}
									onChange={this.onChangeName}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="item_type">Item Type</label>
								<input
									type="text"
									className="form-control"
									id="item_type"
									value={currentItem.item_type}
									onChange={this.onChangeType}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="element">Element</label>
								<input
									type="text"
									className="form-control"
									id="element"
									value={currentItem.element}
									onChange={this.onChangeElement}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="effect">Effect</label>
								<input
									type="text"
									className="form-control"
									id="effect"
									value={currentItem.effect}
									onChange={this.onChangeEffect}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="notes">Notes</label>
								<input
									type="text"
									className="form-control"
									id="notes"
									value={currentItem.notes}
									onChange={this.onChangeNotes}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="recommended">
									Recommended?
								</label>
								<input
									type="text"
									className="form-control"
									id="recommended"
									value={currentItem.recommended}
									onChange={this.onChangeRec}
								/>
							</div>
						</form>

						<button
							className="badge badge-danger mr-2"
							onClick={this.deleteItem}
						>
							DELETE
						</button>

						<button
							type="submit"
							className="badge badge-success"
							onClick={this.updateItem}
						>
							UPDATE
						</button>
						<p>{this.state.message}</p>
					</div>
				) : (
					<div>
						<br />
						<p>Please click on an item</p>
					</div>
				)}
			</div>
		);
	}
}
