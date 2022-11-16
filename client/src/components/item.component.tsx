import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ItemDataService from "../services/item.service";
import ItemData from "../types/item.type";

// React component for detailed item page
const Item: React.FC = () => {
	const { id } = useParams();
	let navigate = useNavigate();

	const initialItemState = {
		id: null,
		item_name: "",
		item_type: "",
		element: "",
		effect: "",
		notes: "",
		recommended: false
	};

	const [currentItem, setCurrentItem] = useState<ItemData>(initialItemState);
	const [message, setMessage] = useState<String>("");

	// function to get item by id
	const getItem = (id: string) => {
		ItemDataService.get(id)
			.then((response: any) => {
				setCurrentItem(response.data);
				console.log(response.data);
			})
			.catch((e: Error) => {
				console.log(e);
			});
	};

	useEffect(() => {
		if (id) getItem(id);
	}, [id]);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setCurrentItem({ ...currentItem, [name]: value });
	};

	const updateRecommended = (status: boolean) => {
		const data = {
			id: currentItem.id,
			item_name: currentItem.item_name,
			item_type: currentItem.item_type,
			element: currentItem.element,
			effect: currentItem.effect,
			notes: currentItem.notes,
			recommended: status
		};

		ItemDataService.update(currentItem.id, data)
			.then((response: any) => {
				console.log(response.data);
				setCurrentItem({ ...currentItem, recommended: status });
				setMessage("Item updated successfully");
			})
			.catch((e: Error) => {
				console.log(e);
			});
	};

	// function to push the new info to the item at the existing item id
	const updateItem = () => {
		ItemDataService.update(currentItem.id, currentItem)
			.then((response: any) => {
				console.log(response.data);
				setMessage("Item updated successfully");
			})
			.catch((e: Error) => {
				console.log(e);
			});
	};

	// DO NOT USE UNLESS ABSOLUTELY NECESSARY
	const deleteItem = () => {
		ItemDataService.remove(currentItem.id)
			.then((response: any) => {
				console.log(response.data);
				navigate("/items");
			})
			.catch((e: Error) => {
				console.log(e);
			});
	};

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
								id="item_name"
								value={currentItem.item_name}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="item_type">Item Type</label>
							<input
								type="text"
								className="form-control"
								id="item_type"
								value={currentItem.item_type}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="element">Element</label>
							<input
								type="text"
								className="form-control"
								id="element"
								value={currentItem.element}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="effect">Effect</label>
							<input
								type="text"
								className="form-control"
								id="effect"
								value={currentItem.effect}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="notes">Notes</label>
							<input
								type="text"
								className="form-control"
								id="notes"
								value={currentItem.notes}
								onChange={handleInputChange}
							/>
						</div>
						<div className="form-group">
							<label>
								<strong>Recommended?</strong>
							</label>
							{currentItem.recommended ? "YES" : "NO"}
						</div>
					</form>

					{currentItem.recommended ? (
						<button
							className="badge badge-primary mr-2"
							onClick={() => updateRecommended(false)}
						>
							NO
						</button>
					) : (
						<button
							className="badge badge-primary mr-2"
							onClick={() => updateRecommended(true)}
						>
							YES
						</button>
					)}

					<button
						className="badge badge-danger mr-2"
						onClick={deleteItem}
					>
						DELETE
					</button>

					<button
						type="submit"
						className="badge badge-success"
						onClick={updateItem}
					>
						UPDATE
					</button>
					<p>{message}</p>
				</div>
			) : (
				<div>
					<br />
					<p>Please click on an item</p>
				</div>
			)}
		</div>
	);
};

export default Item;
