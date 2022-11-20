import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { Nav, Navbar } from "react-bootstrap";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AddItem from "./components/AddItem";
import Item from "./components/Item";
import ItemsList from "./components/ItemsList";
import logo from "./images/base_icon.png";
import bl3tBG from "./images/bl3tBG1440x2960.jpg";

function App() {
	return (
		<div
			className="bodyStyle"
			style={{
				backgroundImage: `url(${bl3tBG})`,
			}}
		>
			<Navbar expand="sm" variant="light" bg="warning" className="px-0 ">
				<Navbar.Brand href="/#/items">
					<img className="navLogo" src={logo} alt="logo" /> HOME
				</Navbar.Brand>
				<Navbar.Toggle className="toggler" aria-controls="basicNavbar" />
				<Navbar.Collapse id="basicNavbar">
					<Nav className="justify-content-start">
						<li>
							<Link to={"/items"} className="nav-link link-dark">
								Items
							</Link>
						</li>
						<li>
							<Link to={"/add"} className="nav-link link-dark">
								Add Item
							</Link>
						</li>
					</Nav>
				</Navbar.Collapse>
			</Navbar>

			<div className="mt-3">
				<Routes>
					<Route path="/" element={<ItemsList />} />
					<Route path="/items" element={<ItemsList />} />
					<Route path="/add" element={<AddItem />} />
					<Route path="/items/:id" element={<Item />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
