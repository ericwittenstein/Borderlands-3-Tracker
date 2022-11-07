import { Component, ChangeEvent } from "react";
import ItemDataService from "../services/itemService";
import ItemData from "../types/itemTypes";

type Props = {};

type State = ItemData & {
	submitted: boolean;
};

// react component that will function as the add form
export default class AddItem extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		// bind the change events to the item props
		this.onChangeName = this.onChangeName.bind(this);
		this.onChangeType = this.onChangeType.bind(this);
		this.onChangeElement = this.onChangeElement.bind(this);
		this.onChangeEffect = this.onChangeEffect.bind(this);
		this.onChangeNotes = this.onChangeNotes.bind(this);
		this.onChangeRec = this.onChangeRec.bind(this);
		this.saveItem = this.saveItem.bind(this);
		this.newItem = this.newItem.bind(this);

		// initial state of the item
		this.state = {
			id: null,
			name: "",
			item_type: "",
			element: "",
			effect: "",
			notes: "",
			recommended: "",
			submitted: false
		};
	}

	// trackers for value changes and assignment
	onChangeName(e: ChangeEvent<HTMLInputElement>) {
		this.setState({
			name: e.target.value
		});
	}

	onChangeType(e: ChangeEvent<HTMLInputElement>) {
		this.setState({
			item_type: e.target.value
		});
	}

	onChangeElement(e: ChangeEvent<HTMLInputElement>) {
		this.setState({
			element: e.target.value
		});
	}

	onChangeEffect(e: ChangeEvent<HTMLInputElement>) {
		this.setState({
			effect: e.target.value
		});
	}

	onChangeNotes(e: ChangeEvent<HTMLInputElement>) {
		this.setState({
			notes: e.target.value
		});
	}

	onChangeRec(e: ChangeEvent<HTMLInputElement>) {
		this.setState({
			recommended: e.target.value
		});
	}

	// item submission function
	saveItem() {
		const data: ItemData = {
			name: this.state.name,
			item_type: this.state.item_type,
			element: this.state.element,
			effect: this.state.effect,
			notes: this.state.notes,
			recommended: this.state.recommended
		};

		ItemDataService.create(data)
			.then((response) => {
				this.setState({
					id: response.data.id,
					name: response.data.name,
					item_type: response.data.id,
					element: response.data.element,
					effect: response.data.effect,
					notes: response.data.notes,
					recommended: response.data.recommended,
					submitted: true
				});
				console.log(response.data);
			})
			.catch((e: Error) => {
				console.log(e);
			});
	}

	// new item function
	newItem() {
		this.setState({
			id: null,
			name: "",
			item_type: "",
			element: "",
			effect: "",
			notes: "",
			recommended: "",
			submitted: false
		});
	}

	// function to handle rendering of AddItem component
	render() {
		const {
			name,
			item_type,
			element,
			effect,
			notes,
			recommended,
			submitted
		} = this.state;

		// check if submitted. if false, show add form; if true, show add item button to reload form
		// TODO: change some fields to dropdown menus
		return (
			<div className="submit-form">
				{submitted ? (
					<div>
						<h4>New item added successfully!</h4>
						<button
							className="btn btn-success"
							onClick={this.newItem}
						>
							Add New Item
						</button>
					</div>
				) : (
					<div>
						<div className="form-group">
							<label htmlFor="name">Item Base Name</label>
							<input
								type="text"
								className="form-control"
								id="name"
								required
								value={name}
								onChange={this.onChangeName}
								name="name"
								placeholder="Name"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="item_type">Item Type</label>
							<input
								type="text"
								className="form-control"
								id="item_type"
								required
								value={item_type}
								onChange={this.onChangeType}
								name="item_type"
								placeholder="Item type"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="element">Elemental Effect</label>
							<input
								type="text"
								className="form-control"
								id="element"
								required
								value={element}
								onChange={this.onChangeElement}
								name="element"
								placeholder="Neutral/Fire/Corrosive/Shock/Cryo/Radiation"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="effect">
								Item Effect / Abiltiy
							</label>
							<input
								type="text"
								className="form-control"
								id="effect"
								required
								value={effect}
								onChange={this.onChangeEffect}
								name="effect"
								placeholder="Translated Red Text into plain English"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="notes">Miscellaneous Notes</label>
							<input
								type="text"
								className="form-control"
								id="notes"
								value={notes}
								onChange={this.onChangeNotes}
								name="notes"
								placeholder="Notes, good for, bad for, etc."
							/>
						</div>
						<div className="form-group">
							<label htmlFor="rec">Recommended</label>
							<input
								type="text"
								className="form-control"
								id="rec"
								required
								value={recommended}
								onChange={this.onChangeRec}
								name="rec"
								placeholder="Is this item recommended or not?"
							/>
						</div>

                        <button onClick={this.saveItem} className="btn btn-success">
                            Submit
                        </button>
					</div>
				)}
			</div>
		);
	}
}
