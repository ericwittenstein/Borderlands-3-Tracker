import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { Container } from "react-bootstrap";
import React from "react";
import { Routes, Route, Link, } from "react-router-dom";
import AddItem from "./components/AddItem";
import Item from "./components/Item";
import ItemsList from "./components/ItemsList";


function App () {
	return (
		<Container>
			<nav className="navbar navbar-expand navbar-dark bg-dark">
				<Link to={"/items"} className="navbar-brand">
					EWITT
				</Link>
				<div className="navbar-nav mr-auto">
					<li className="nav-item">
						<Link to={"/items"} className="nav-link">
							Items
						</Link>
					</li>
					<li className="nav-item">
						<Link to={"/add"} className="nav-link">
							Add Item
						</Link>
					</li>
				</div>
			</nav>

			<div className="container mt-3">
				<Routes>
					<Route path="/" element={<ItemsList/>} />
					<Route path="/items" element={<ItemsList/>} />
					<Route path="/add" element={<AddItem/>} />
					<Route path="/items/:id" element={<Item/>} />
				</Routes>
			</div>
		</Container>
	);
};

export default App;
