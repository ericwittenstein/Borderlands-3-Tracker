import React, { useState, useEffect } from "react";
import ItemService from "../services/ItemService";
import { Link } from "react-router-dom";
import {
	Button,
	ListGroup,
	Row,
	Col,
	Container,
	InputGroup,
	Form,
	Badge,
} from "react-bootstrap";

// react component for list of items
const ItemsList = () => {
	const [items, setItems] = useState([]);
	const [currentItem, setCurrentItem] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [searchName, setSearchName] = useState("");

	useEffect(() => {
		retrieveItems();
	}, []);

	// tracker for value changes and assignment for search bar
	const onChangeSearchName = (e) => {
		const searchName = e.target.value;
		setSearchName(searchName);
	};

	// function to retrieve list of items
	const retrieveItems = () => {
		ItemService.getAll()
			.then((response) => {
				setItems(response.data);
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	// function to refresh and reset the item list display
	const refreshList = () => {
		retrieveItems();
		setCurrentItem(null);
		setCurrentIndex(-1);
	};

	// function to designate the current item as active
	const setActiveItem = (item, index) => {
		setCurrentItem(item);
		setCurrentIndex(index);
	};

	// function to delete all items
	// DO NOT USE UNLESS ABSOLUTELY SURE
	const removeAllItems = () => {
		ItemService.removeAll()
			.then((response) => {
				console.log(response.data);
				refreshList();
			})
			.catch((e) => {
				console.log(e);
			});
	};

	// function to handle the search by name feature
	const findByName = () => {
		ItemService.findByName(searchName)
			.then((response) => {
				setItems(response.data);
				console.log(response.data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	// function to render the component for the list of items
	return (
		<ListGroup>
			{/* Search Bar */}
			<Row md={6}>
				<InputGroup className="mb-3">
					<Form.Control
						placeholder="Search by Item Name"
						value={searchName}
						onChange={onChangeSearchName}
					/>
					<Button variant="outline-secondary" onClick={findByName}>
						Search
					</Button>
				</InputGroup>
			</Row>
			<Row>
				<Col sm={3}>
					<h4>Items List</h4>
					{/* This should be the list of all the items */}
					<ListGroup>
						{items &&
							items.map((item, index) => (
								<ListGroup.Item
									className={
										index === currentIndex ? "active" : ""
									}
									onClick={() => setActiveItem(item, index)}
									key={index}
								>
									{item.item_name}
								</ListGroup.Item>
							))}
					</ListGroup>
					{/* THIS IS THE DELETE ALL BUTTON, DO NOT USE UNLESS ABSOLUTELY NECESSARY */}
					<Button
						variant="danger"
						size="sm"
						className="m-3"
						onClick={removeAllItems}
					>
						Remove All
					</Button>
				</Col>
				{/* This is the section that will render the details of the active item */}
				<Col sm={8}>
					{currentItem ? (
						<Container>
							<h4>Item</h4>
							<Row>
								<label>
									<strong>Name:</strong>
								</label>{" "}
								{currentItem.item_name}
							</Row>
							<Row>
								<label>
									<strong>Item Type:</strong>
								</label>{" "}
								{currentItem.item_type}
							</Row>
							<Row>
								<label>
									<strong>Element:</strong>
								</label>{" "}
								{currentItem.element}
							</Row>
							<Row>
								<label>
									<strong>Effect:</strong>
								</label>{" "}
								{currentItem.effect}
							</Row>
							<Row>
								<label>
									<strong>Notes:</strong>
								</label>{" "}
								{currentItem.notes}
							</Row>
							<Row>
								<label>
									<strong>Recommended:</strong>
								</label>{" "}
								{currentItem.recommended ? "YES" : "NO"}
							</Row>

							<Badge
								as={Link}
								to={"/items/" + currentItem.id}
								variant="warning"
							>
								Edit
							</Badge>
						</Container>
					) : (
						// If no item selected, prompt for selection
						<Container>
							<br />
							<p>
								Please click on an item to pull up its
								information sheet
							</p>
						</Container>
					)}
				</Col>
			</Row>
		</ListGroup>
	);
};

export default ItemsList;
