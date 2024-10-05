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
import ProductManage from "./pages/product manage page/ProductManage";
import ProductAddForm from "./components/product new/ProductAddForm";
import UserAuthContext, { useAuth } from "./userContext/UserAuthContext";
import ProfilePage from "./pages/profile page/ProfilePage";
import Cart from "./pages/cart page/Cart";
import Wishlist from "./pages/wishlist page/Wishlist";
function App() {
  const { isAuth, role } = useAuth();
  console.log(isAuth, role);
  return (
    <div>
      <UserAuthContext>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={isAuth ? <Home /> : <Authpage />}>
              <Route path="/login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/verify-user" element={<UserAuthContext />} />
              <Route path="signup/verify-otp" element={isAuth? <></>: <Otp />} />
            </Route>
            <Route path="/user/profile" element={<ProfilePage />} />
            <Route path="/user/cart"  element={<Cart />}/>
            <Route path="/user/wishlist" element={<Wishlist />}/>
            <Route
              path="/products"
              element={role === "admin" ? <ProductManage /> : <></>}
            >
              <Route path="new" element={<ProductAddForm />} />
              <Route path=":productid/edit" />
            </Route>
          </Routes>
        </Router>
      </UserAuthContext>
      <FooterUpperPart />
      <Footer />
    </div>
  );
}

export default App;


