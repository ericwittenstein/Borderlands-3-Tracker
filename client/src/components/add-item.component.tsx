import React, { useState, ChangeEvent } from "react";
import ItemDataService from "../services/item.service";
import ItemData from "../types/item.type";

// TODO: Refactor and double check EVERYTHING

// react component that will function as the add form
const AddItem: React.FC = () => {
	const initialItemState = {
		id: null,
		item_name: "",
		item_type: "",
		element: "",
		effect: "",
		notes: "",
		recommended: false
	};

	const [item, setItem] = useState<ItemData>(initialItemState);
	const [submitted, setSubmitted] = useState<boolean>(false);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setItem({ ...item, [name]: value });
	};

	// item submission function
	const saveItem = () => {
		const data = {
			item_name: item.item_name,
			item_type: item.item_type,
			element: item.element,
			effect: item.effect,
			notes: item.notes
			// recommended: this.state.recommended
		};

		console.log("This is from the add-item saveItem function:" + data);

		ItemDataService.create(data)
			.then((response: any) => {
				setItem({
					id: response.data.id,
					item_name: response.data.item_name,
					item_type: response.data.item_type,
					element: response.data.element,
					effect: response.data.effect,
					notes: response.data.notes,
					recommended: response.data.recommended
				});
				setSubmitted(true);
				console.log(response.data);
			})
			.catch((e: Error) => {
				console.log(e);
			});
	};

	// new item function
	const newItem = () => {
		setItem(initialItemState);
		setSubmitted(false);
	};

	// function to handle rendering of AddItem component
	return (
		// check if submitted. if false, show add form; if true, show add item button to reload form
		// TODO: change some fields to dropdown menus, radio buttons, etc for input control

		<div className="submit-form">
			{submitted ? (
				<div>
					<h4>New item added successfully!</h4>
					<button className="btn btn-success" onClick={newItem}>
						Add New Item
					</button>
				</div>
			) : (
				<div>
					<div className="form-group">
						<label htmlFor="item_name">Item Base Name</label>
						<input
							type="text"
							className="form-control"
							id="item_name"
							required
							value={item.item_name}
							onChange={handleInputChange}
							name="item_name"
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
							value={item.item_type}
							onChange={handleInputChange}
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
							value={item.element}
							onChange={handleInputChange}
							name="element"
							placeholder="Neutral/Fire/Corrosive/Shock/Cryo/Radiation"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="effect">Item Effect / Abiltiy</label>
						<input
							type="text"
							className="form-control"
							id="effect"
							required
							value={item.effect}
							onChange={handleInputChange}
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
							value={item.notes}
							onChange={handleInputChange}
							name="notes"
							placeholder="Notes, good for, bad for, etc."
						/>
					</div>
					{/* <div className="form-group">
							<label htmlFor="recommended">Recommended</label>
							<input
								type="text"
								className="form-control"
								id="recommended"
								required
								value={recommended}
								onChange={this.onChangeRec}
								name="recommended"
								placeholder="Is this item recommended or not?"
							/>
						</div> */}

					<button onClick={saveItem} className="btn btn-success">
						Submit
					</button>
				</div>
			)}
		</div>
	);
};

export default AddItem;
