import React, { useState, useEffect } from "react";
import ItemService from "../services/ItemService";
import {
	Button,
	ListGroup,
	Row,
	Col,
	Container,
	InputGroup,
	Form,
	Pagination,
} from "react-bootstrap";
import { Link } from "react-router-dom";

// react component for list of items
const ItemsList = () => {
	const [items, setItems] = useState([]);
	const [currentItem, setCurrentItem] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const [searchName, setSearchName] = useState("");

	const [page, setPage] = useState(1);
	const [count, setCount] = useState(0);
	const [pageSize, setPageSize] = useState(10);

	const pageSizes = [5, 10, 20];

	// tracker for value changes and assignment for search bar
	const onChangeSearchName = (e) => {
		const searchName = e.target.value;
		setSearchName(searchName);
	};

	// function to handle if there are certain request params, add them to the params to send
	const getRequestParams = (searchName, page, pageSize) => {
		let params = {};

		if (searchName) {
			params["item_name"] = searchName;
		}

		if (page) {
			params["page"] = page - 1;
		}

		if (pageSize) {
			params["size"] = pageSize;
		}

		return params;
	};

	// function to retrieve list of items
	const retrieveItems = () => {
		// call to the search name, page, and pagesize states and turn them into the params object
		const params = getRequestParams(searchName, page, pageSize);

		ItemService.getAll(params)
			.then((response) => {
				// setItems(response.data);
				const { items, totalPages } = response.data;
				setItems(items);
				setCount(totalPages);
				console.log(response.data);
			})
			.catch((e) => {
				console.log(
					`Some error occurred during item data retrieval: ${e}`
				);
			});
	};

	useEffect(retrieveItems, [page, pageSize]);

	// change the page
	const handlePageChange = (e, value) => {
		setPage(value);
	};

	// change the number of items perpage
	const handlePageSizeChange = (e) => {
		setPageSize(e.target.value);
		setPage(1);
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
					{/* Adding pagination elements */}
					
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
					{/* <Button
						variant="danger"
						size="sm"
						className="m-3"
						onClick={removeAllItems}
					>
						Remove All
					</Button> */}
				</Col>
				{/* This is the section that will render the details of the active item */}
				<Col sm={8}>
					{currentItem ? (
						<Container className="item-active">
							<h4>Item</h4>
							<Row>
								<label>
									<strong>Name: </strong>
									{currentItem.item_name}
								</label>
							</Row>
							<Row>
								<label>
									<strong>Item Type: </strong>
									{currentItem.item_type}
								</label>
							</Row>
							<Row>
								<label>
									<strong>Element: </strong>
									{currentItem.element}
								</label>
							</Row>
							<Row>
								<label>
									<strong>Effect: </strong>
									{currentItem.effect}
								</label>
							</Row>
							<Row>
								<label>
									<strong>Notes: </strong>
									{currentItem.notes}
								</label>
							</Row>
							<Row>
								<label>
									<strong>Recommended: </strong>
									{currentItem.recommended ? "YES" : "NO"}
								</label>
							</Row>

							<Button
								href={"#/items/" + currentItem.id}
								variant="primary"
							>
								Edit
							</Button>
						</Container>
					) : (
						// If no item selected, prompt for selection
						<Container>
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
