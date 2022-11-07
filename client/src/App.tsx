import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AddItem from "./components/add-itemComp";
import Item from "./components/itemComp";
import itemsList from "./components/items-listComp";

class App extends Component {
	render() {
    return (
      <div>
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
            <Route path="/items" element={itemsList}/>
            <Route path="/add" element={AddItem}/>
            <Route path="/items/:id" element={Item}/>
          </Routes>
        </div>
      </div>
    )
  }
}

export default App;
