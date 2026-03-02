import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import Home from "./home";
import Veg from "./veg";
import NonVeg from "./Nonveg";
import Milk from "./Milk";
import ContactDetails from "./ContactDetails";
import AboutUs from "./AboutUs";
import Cart from "./Cart";
import { useSelector } from "react-redux";


function App() {
  let cartitems = useSelector(globalstate => globalstate.cart);
  let cartcount = cartitems.reduce((total, item) => total + item.quantity, 0);
  return (
    <BrowserRouter>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/home">
            Food Menu
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/veg">
                  Veg Items
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/nonveg">
                  Non-Veg Items
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/milk">
                  Milk Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/aboutus">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart {cartcount}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ROUTES */}
   
        <main className="app-container my-4">

       <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/milk" element={<Milk />} />
          <Route path="/contact" element={<ContactDetails />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
