import React from "react";
import Navbar from "../components/Navbar";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <div>
        <div className="row position-relative">
          <div className="col"><SignupForm/></div>
          <div className="col position-absolute"><Navbar/></div>
        </div>
    </div>
  );
};

export default Signup;
