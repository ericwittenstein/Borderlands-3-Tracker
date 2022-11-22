import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ItemService from "../services/ItemService";

// TODO: Refactor and double check EVERYTHING

// react component that will function as the add form
const AddItem = () => {
	const initialItemState = {
		id: null,
		item_name: "",
		item_type: "",
		element: "",
		effect: "",
		notes: "",
		recommended: false,
	};

	const [item, setItem] = useState(initialItemState);
	const [submitted, setSubmitted] = useState(false);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setItem({ ...item, [name]: value });
	};

	// item submission function
	const saveItem = (subd) => {
		var data = {
			item_name: item.item_name,
			item_type: item.item_type,
			element: item.element,
			effect: item.effect,
			notes: item.notes,
		};

		console.log("This is from the add-item saveItem function:" + data);

		ItemService.create(data)
			.then((response) => {
				setItem({
					id: response.data.id,
					item_name: response.data.item_name,
					item_type: response.data.item_type,
					element: response.data.element,
					effect: response.data.effect,
					notes: response.data.notes,
					recommended: response.data.recommended,
				});
				setSubmitted(true);
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});

		subd.preventDefault();
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

		<Form>
			{submitted ? (
				<Form.Group controlId="formAddItem">
					<h4>New item added successfully!</h4>
					<Button variant="success" onClick={newItem}>
						Add New Item
					</Button>
				</Form.Group>
			) : (
				<Form.Group controlId="formAddItemInputs">
					<Form.Group controlId="formName itemrow">
						<Form.Label htmlFor="item_name">
							Item Base Name
						</Form.Label>
						<Form.Control
							type="text"
							id="item_name"
							required
							value={item.item_name}
							onChange={handleInputChange}
							name="item_name"
							placeholder="Name"
							autoComplete="off"
						/>
					</Form.Group>
					<Form.Group controlId="formType itemrow">
						<Form.Label htmlFor="item_type">Item Type</Form.Label>
						<Form.Select
							id="item_type"
							required
							value={item.item_type}
							onChange={handleInputChange}
							name="item_type"
							placeholder="Item type"
						>
							<option>Choose Item Type</option>
							<option value={"Handgun"}>Handgun</option>
							<option value={"Rifle"}>
								Rifle
							</option>
							<option value={"SMG"}>Submachine Gun (SMG)</option>
							<option value={"Shotgun"}>Shotgun</option>
							<option value={"Sniper"}>Sniper</option>
							<option value={"Heavy"}>Heavy</option>
							<option value={"Grenade"}>Grenade</option>
							<option value={"Shield"}>Shield</option>
							<option value={"Class Mod"}>Class Mod</option>
						</Form.Select>
					</Form.Group>
					<Form.Group controlId="formElement itemrow">
						<Form.Label htmlFor="element">
							Elemental Effect
						</Form.Label>
						<Form.Control
							type="text"
							id="element"
							required
							value={item.element}
							onChange={handleInputChange}
							name="element"
							placeholder="Neutral/Incendiary/Corrosive/Shock/Cryo/Radiation"
							aria-describedby="elementHelpText"
						/>
						<Form.Text id="elementHelpText" muted>
							Write all elements the items could be, seperated by
							a slash. If any, write "Any"
						</Form.Text>
					</Form.Group>
					<Form.Group controlId="formEffect itemrow">
						<Form.Label htmlFor="effect">
							Item Effect / Abiltiy
						</Form.Label>
						<Form.Control
							type="text"
							rows={3}
							id="effect"
							required
							value={item.effect}
							onChange={handleInputChange}
							name="effect"
							placeholder="Translated Red Text into plain English"
							autoComplete="off"
						/>
					</Form.Group>
					<Form.Group controlId="formNotes itemrow">
						<Form.Label htmlFor="notes">
							Miscellaneous Notes
						</Form.Label>
						<Form.Control
							type="text"
							id="notes"
							value={item.notes}
							onChange={handleInputChange}
							name="notes"
							placeholder="Notes, good for, bad for, etc."
							autoComplete="off"
						/>
					</Form.Group>
					{/* <Form.Group>
						<Form.Label htmlFor="recommended">Recommended</Form.Label>
						<Form.Control
							type="text"
							id="recommended"
							required
							value={item.recommended}
							onChange={handleInputChange}
							name="recommended"
							placeholder="Is this item recommended or not?"
						/>
					</Form.Group> */}

					<Button onClick={saveItem} type="submit" variant="success">
						Submit
					</Button>
				</Form.Group>
			)}
		</Form>
	);
};

export default AddItem;
