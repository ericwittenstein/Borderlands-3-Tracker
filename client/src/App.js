import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AddItem from "./components/AddItem";
import Item from "./components/Item";
import ItemsList from "./components/ItemsList";
import { HeaderImg } from "./components/HeaderImg";

function App() {
	return (
		<Container>
			<HeaderImg />
			<Navbar expand="sm" bg="light" variant="light" >
				<Navbar.Brand href="/items">EWITT</Navbar.Brand>
				<Navbar.Toggle aria-controls="basicNavbar" />
				<Navbar.Collapse id="basicNavbar">
					<Nav as="ul" className="justify-content-start">
						<Nav.Item as="li">
							<Nav.Link to={"/items"}>Items</Nav.Link>
						</Nav.Item>
						<Nav.Item as="li">
							<Nav.Link to={"/add"}>Add Item</Nav.Link>
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>

			<Container className="mt-3">
				<Routes>
					<Route path="/" element={<ItemsList />} />
					<Route path="/items" element={<ItemsList />} />
					<Route path="/add" element={<AddItem />} />
					<Route path="/items/:id" element={<Item />} />
				</Routes>
			</Container>
		</Container>
	);
}

export default App;
