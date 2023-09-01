import React, { useState } from 'react'
import background from '../images/hero.avif';
import { Link, useNavigate } from 'react-router-dom';

const SignupForm = () => {
    let navigate=useNavigate();
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",location:""})
    const handlesubmit= async (e)=>{
        e.preventDefault();
        const {name,email,password,location}=credentials;
        const response= await fetch("https://cravingcouriers.onrender.com/api/createuser",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name,email,password,location})
        })
        const json=await response.json();
        if(!json.success){
            if(json.error!==undefined){
              alert(json.errors);
            }
            else{
              alert("Invalid credentials");
            }
        }
        else{
          localStorage.setItem("userEmail",email);
          localStorage.setItem("authToken",json.authToken);
          navigate("/");
        }
    }
    const handlechange=(e)=>{
        setCredentials({...credentials,[e.target.name] : e.target.value})
    }
  return (
    <div>
      <section
        className="vh-100 bg-image "
        style={{
            backgroundImage: `url(${background})`
        }}
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3 pt-5" >
          <div className="container ">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ border: "15px" }}>
                  <div className="card-body p-4">
                    <h2 className="text-uppercase text-center mb-3">
                      Create an account
                    </h2>

                    <form onSubmit={handlesubmit}>
                      <div className="form-outline mb-1">
                        <input
                          type="text"
                          id="name"
                          className="form-control form-control-lg"
                          name='name'
                          value={credentials.name}
                          onChange={handlechange}
                        />
                        <label className="form-label" htmlFor="name">
                          Your Name
                        </label>
                      </div>

                      <div className="form-outline mb-1">
                        <input
                          type="email"
                          id="email"
                          className="form-control form-control-lg"
                          name='email'
                          value={credentials.email}
                          onChange={handlechange}
                        />
                        <label className="form-label" htmlFor="email">
                          Your Email
                        </label>
                      </div>

                      <div className="form-outline mb-1">
                        <input
                          type="password"
                          id="password"
                          className="form-control form-control-lg"
                          name='password'
                          value={credentials.password}
                          onChange={handlechange}
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>

                      <div className="form-outline">
                        <input
                          type="text"
                          id="location"
                          className="form-control form-control-lg"
                          name='location'
                          value={credentials.location}
                          onChange={handlechange}
                        />
                        <label className="form-label" htmlFor="location">
                          Location
                        </label>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Register
                        </button>
                      </div>

                      <p className="text-center text-muted mt-2 mb-0">
                        Have already an account?{" "}
                        <Link to="/login" className="fw-bold text-body">
                          <u>Login here</u>
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignupForm
