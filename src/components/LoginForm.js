import React, { useState } from 'react'
import background from '../images/hero.avif';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {

    let navigate=useNavigate();
    const [credentials,setCredentials]=useState({email:"",password:""})
    const handlesubmit= async (e)=>{
        e.preventDefault();
        const {email,password}=credentials;
        const response= await fetch("http://localhost:5000/api/loginuser",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password})
        })
        const json=await response.json();
        if(!json.success){
          alert("Incorrect credentials");
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
        className="vh-100 bg-image"
        style={{
            backgroundImage: `url(${background})`
        }}
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3 pt-5" >
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderr: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Create an account
                    </h2>

                    <form onSubmit={handlesubmit}>
                      <div className="form-outline mb-4">
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

                      <div className="form-outline mb-4">
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
                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Login
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Don't have an account?{" "}
                        <Link to="/signup" className="fw-bold text-body">
                          <u>Create a new account</u>
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

export default LoginForm
