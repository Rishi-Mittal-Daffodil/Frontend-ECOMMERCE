import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Home from "./components/home/Home";
import Otp from "./components/otp/Otp";
import Footer from "./components/footer/Footer";
import FooterUpperPart from "./components/footerup/FooterUpperPart";
import Navbar from "./components/navbar/Navbar";
import Authpage from "./pages/auth page/Authpage";
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path='/verify-otp'  element={<Otp />} /> */}
          {/* <Route path='/signup' element={<Signup />}/> */}
          <Route path="/" element={<Authpage />}>
            <Route path="/login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signup/verify-otp" element={<Otp />} />
          </Route>
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
      <FooterUpperPart />
      <Footer />
    </div>
  );
}

export default App;
