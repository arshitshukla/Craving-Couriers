import React from "react";
import img from '../images/hero.avif'
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="mt-5">
       <div className="row position-relative">
        <img src={img} className="d-block w-100" style={{"height":"250px","filter":"brightness(30%)","objectFit":"fill"}} alt="..."/>
       <div className="col position-absolute">
        <div className="mt-5">
          <footer
            className="text-center text-lg-start"
          >
            
            <div className="container d-flex justify-content-center py-5">
              <button
                type="button"
                className="btn text-white rounded-circle btn-lg btn-floating mx-2"
                style={{"backgroundColor": "#3b5998"}}
              >
                <i className="fab fa-facebook-f"></i>
              </button>
              <button
                type="button"
                className="btn text-white btn-lg rounded-circle btn-floating mx-2"
                style={{"backgroundColor": "red"}}
              >
                <i className="fab fa-youtube"></i>
              </button>
              <button
                type="button"
                className="btn text-white rounded-circle btn-lg btn-floating mx-2"
                style={{"backgroundColor": "#ac2bac"}}
              >
                <i className="fab fa-instagram"></i>
              </button>
              <button
                type="button"
                className="btn text-white btn-lg rounded-circle btn-floating mx-2"
                style={{"backgroundColor": "#55acee"}}
              >
                <i className="fab fa-twitter"></i>
              </button>
            </div>

            <div
              className="text-center text-white p-3"
              style={{"backgroundColor": "rgba(0, 0, 0, 0.6)","fontFamily":"cursive"}}
            >
              © 2023 Copyright : 
              <Link className="text-white" to="/">
                Craving-Couriers
              </Link>
            </div>
          </footer>
        </div>
       </div>
       </div>
      
    </div>
  );
};

export default Footer;
