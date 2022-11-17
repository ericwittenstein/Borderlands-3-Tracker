import React, { useState, useEffect } from "react";
import { Badge, Button, Container, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

import ItemService from "../services/ItemService";

// React component for detailed item page
const Item = (props) => {
	const { id } = useParams();
	let navigate = useNavigate();

	const initialItemState = {
		id: null,
		item_name: "",
		item_type: "",
		element: "",
		effect: "",
		notes: "",
		recommended: false,
	};

	const [currentItem, setCurrentItem] = useState(initialItemState);
	const [message, setMessage] = useState("");

	// function to get item by id
	const getItem = (id) => {
		ItemService.get(id)
			.then((response) => {
				setCurrentItem(response.data);
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	useEffect(() => {
		if (id) {
			getItem(id);
		}
	}, [id]);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setCurrentItem({ ...currentItem, [name]: value });
	};

	const updateRecommended = (status) => {
		var data = {
			id: currentItem.id,
			item_name: currentItem.item_name,
			item_type: currentItem.item_type,
			element: currentItem.element,
			effect: currentItem.effect,
			notes: currentItem.notes,
			recommended: status,
		};

		ItemService.update(currentItem.id, data)
			.then((response) => {
				setCurrentItem({ ...currentItem, recommended: status });
				console.log(response.data);
				// setMessage("Item updated successfully");
			})
			.catch((e) => {
				console.log(e);
			});
	};

	// function to push the new info to the item at the existing item id
	const updateItem = () => {
		ItemService.update(currentItem.id, currentItem)
			.then((response) => {
				console.log(response.data);
				setMessage("Item updated successfully");
			})
			.catch((e) => {
				console.log(e);
			});
	};

	// DO NOT USE UNLESS ABSOLUTELY NECESSARY
	const deleteItem = () => {
		ItemService.remove(currentItem.id)
			.then((response) => {
				console.log(response.data);
				navigate("/items");
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<Container>
			{currentItem ? (
				<Form className="edit-form">
					<h4>Item</h4>
					<Form.Group>
						<Form.Group>
							<Form.Label htmlFor="item_name">Name</Form.Label>
							<Form.Control
								type="text"
								id="item_name"
								value={currentItem.item_name}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="item_type">
								Item Type
							</Form.Label>
							<Form.Control
								type="text"
								id="item_type"
								value={currentItem.item_type}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="element">Element</Form.Label>
							<Form.Control
								type="text"
								id="element"
								value={currentItem.element}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="effect">Effect</Form.Label>
							<Form.Control
								type="text"
								id="effect"
								value={currentItem.effect}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="notes">Notes</Form.Label>
							<Form.Control
								type="text"
								id="notes"
								value={currentItem.notes}
								onChange={handleInputChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Label>
								<strong>Recommended?</strong>
							</Form.Label>
							{currentItem.recommended ? "YES" : "NO"}
						</Form.Group>
					</Form.Group>

					{currentItem.recommended ? (
						<Badge
							bg="primary"
							className="mr-2"
							onClick={() => updateRecommended(false)}
						>
							NO
						</Badge>
					) : (
						<Badge
							bg="primary"
							className="mr-2"
							onClick={() => updateRecommended(true)}
						>
							YES
						</Badge>
					)}

					<Badge bg="danger" className="mr-2" onClick={deleteItem}>
						DELETE
					</Badge>

					<Button
						type="submit"
						variant="success"
						onClick={updateItem}
					>
						UPDATE
					</Button>
					<p>{message}</p>
				</Form>
			) : (
				<Container>
					<br />
					<p>Please click on an item</p>
				</Container>
			)}
		</Container>
	);
};

export default Item;
