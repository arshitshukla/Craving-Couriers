import React from 'react'
import LoginForm from '../components/LoginForm'
import Navbar from '../components/Navbar'

const Login = () => {
  return (
    <div>
      <div className="row position-relative">
          <div className="col"><LoginForm/></div>
          <div className="col position-absolute"><Navbar/></div>
        </div>
    </div>
  )
}

export default Login