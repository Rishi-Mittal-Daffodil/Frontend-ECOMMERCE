import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Signup  from './components/signup/Signup';
import Home from './components/home/Home';
import Otp from './components/OTP/Otp';
import Footer from './components/footer/Footer';
import FooterUpperPart from './components/footerup/FooterUpperPart';
import Navbar from './components/NavBar/Navbar';
function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<Home />}  />
          <Route path='/verify-otp'  element={<Otp />} />
          <Route path='/login' element={<Login />}  />
          <Route path='/signup' element={<Signup />}/>
          <Route path='/home' element={<Home />}  />
        </Routes>
      </Router>
      <FooterUpperPart />
      <Footer />
    </div>
  )
}



export default App













