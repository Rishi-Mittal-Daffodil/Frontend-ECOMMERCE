import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Signup  from './components/signup/Signup';
import Home from './components/home/Home';
import Otp from './components/OTP/Otp';
import Footer from './components/footer/Footer';
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}  />
          <Route path='/verify-otp'  element={<Otp />} />
          <Route path='/login' element={<Login />}  />
          <Route path='/signup' element={<Signup />}/>
          <Route path='/home' element={<Home />}  />
        </Routes>
      </Router>
      <Footer />
    </div>
  )
}



export default App













