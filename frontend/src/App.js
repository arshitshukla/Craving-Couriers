import Home from "./routes/Home";
import React from "react";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Signup from "./routes/Signup";
import Login from "./routes/Login";
import { CartProvider } from "./components/ContextReducer";
import Myorder from "./routes/Myorder";

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/signup" element={<Signup/>}/>
              <Route exact path="/login" element={<Login/>}/>
              <Route exact path="/myOrder" element={<Myorder/>}/>
            </Routes>
          </div>  
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
