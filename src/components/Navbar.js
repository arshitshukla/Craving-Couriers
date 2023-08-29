import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../routes/Cart";
import { UseCart } from "./ContextReducer";
import cc from '../images/CC.png';

const Navbar = () => {
  let data=UseCart();
  const [cartView,setCartView]=useState(false);
  const Navigate=useNavigate();
  const logout=()=>{
    localStorage.removeItem('authToken');
    Navigate('/');
    alert("Logged out successfully");
  }
  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-dark`}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-2" to="/">
            <img src={cc} alt="CC" width="50" height="40" className="mx-2 d-inline-block align-text-top"></img>
            Craving-Couriers
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mt-3 ml-3">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            {localStorage.getItem('authToken')?
            <li className="nav-item mt-3">
              <Link className="nav-link active" to="/myOrder">My Orders</Link>
            </li>:""}
          </ul>
            {!localStorage.getItem('authToken')?<form className="d-flex" >
              <Link className="btn btn-light btn-lg" to="/login" role="button">Log-In</Link>
              <Link className="btn btn-light btn-lg mx-3" to="/signup" role="button">Sign-Up</Link>
            </form>:<form className="d-flex mt-3" >
                <button type="button" className="btn btn-light mx-3 position-relative" onClick={()=>{setCartView(true)}}>
                My Cart{" "}
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success" >
                  {data.length}
                  <span className="visually-hidden">Cart data</span>
                </span>
                </button>
              {cartView?<Modal onClose={()=>{setCartView(false)}}><Cart/></Modal>:null}
              <button className="btn btn-light  " onClick={logout} >Sign-Out</button>
            </form>}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
