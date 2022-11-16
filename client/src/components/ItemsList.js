import React, { useState, useEffect } from "react";
import ItemService from "../services/ItemService";
import { Link } from "react-router-dom";

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
		<div className="list">
			{/* Search Bar */}
			<div className="col-md-10 row">
				<div className="input-group mb-3">
					<input
						type="text"
						className="form-control"
						placeholder="Search by Item Name"
						value={searchName}
						onChange={onChangeSearchName}
					/>
					<div className="input-group-append">
						<button
							className="btn btn-outline-secondary"
							type="button"
							onClick={findByName}
						>
							Search
						</button>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-3">
					<h4>Items List</h4>
					{/* This should be the list of all the items */}
					<ul className="list-group">
						{items &&
							items.map((item, index) => (
								<li
									className={
										"list-group-item " +
										(index === currentIndex ? "active" : "")
									}
									onClick={() => setActiveItem(item, index)}
									key={index}
								>
									{item.item_name}
								</li>
							))}
					</ul>
					{/* THIS IS THE DELETE ALL BUTTON, DO NOT USE UNLESS ABSOLUTELY NECESSARY */}
					<button
						className="m-3 btn btn-sm btn-danger"
						onClick={removeAllItems}
					>
						Remove All
					</button>
				</div>
				{/* This is the section that will render the details of the active item */}
				<div className="col-8">
					{currentItem ? (
						<div>
							<h4>Item</h4>
							<div>
								<label>
									<strong>Name:</strong>
								</label>{" "}
								{currentItem.item_name}
							</div>
							<div>
								<label>
									<strong>Item Type:</strong>
								</label>{" "}
								{currentItem.item_type}
							</div>
							<div>
								<label>
									<strong>Element:</strong>
								</label>{" "}
								{currentItem.element}
							</div>
							<div>
								<label>
									<strong>Effect:</strong>
								</label>{" "}
								{currentItem.effect}
							</div>
							<div>
								<label>
									<strong>Notes:</strong>
								</label>{" "}
								{currentItem.notes}
							</div>
							<div>
								<label>
									<strong>Recommended:</strong>
								</label>{" "}
								{currentItem.recommended ? "YES" : "NO"}
							</div>

							<Link
								to={"/items/" + currentItem.id}
								className="badge badge-warning"
							>
								Edit
							</Link>
						</div>
					) : (
						// If no item selected, prompt for selection
						<div>
							<br />
							<p>
								Please click on an item to pull up its
								information sheet
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ItemsList;
