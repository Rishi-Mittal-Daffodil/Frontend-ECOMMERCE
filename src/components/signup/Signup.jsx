import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Signup.css'
import youtube from '../asset/ecommerce-logo.png'
import arrow from '../asset/arrow-back.png'

// {
//     "firstName" :  "rishi" , 
//     "lastName" : "mittal" , 
//     "email" : "rishimittal676@gmial.com" , 
//     "password" : "Rishi@@123" , 
//     "role" : "admin" , 
//     "phone" : "12345678" , 
//     "address" : {
//         "street": "street1",
//         "city": "city1",
//         "state": "state1",
//         "postalCode": "postalCode1",
//         "country": "india"
//     }
// }
function Signup() {
  const [firstName, setFirstName] = useState();
  const [email, setEmail] = useState();
  const [lastName, setLastName] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState("customer");
  const [phone , ] = useState(null);
  const [error , setError] = useState() ; 
  const [nextFlag ,  setNextFlag] =  useState(false) ;
  const [street , setStreet] =  useState("");
  const [city , setCity] =  useState("");
  const [state , setState] =  useState("");
  const [postalCode , setPostalCode] =  useState("");
  const [country , setCountry] = useState("") ;   



  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("please wait..")
    const formdata = new FormData();
    const address = {
      street  , country  , state , postalCode ,  city
    }
    const userObj = {
      firstName , lastName , email  , password , role , address
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/register",
        userObj
      );
      console.log(res.data);
      navigate("/verify-otp", { state: email });
    } catch (error) {
      setError('something went wrong while registering')
      console.error("Error during signup:", error);
    }
  };



  const handleNext = (e) => {
    e.preventDefault() ; 
    setNextFlag((flag)=>!flag); 
  }


  return (
    <>
      <div className="form-block">
        <div className="upper-header">
          <img id="logo" src={youtube} alt="logo" />
          <h2>Register</h2>
        </div>
        <hr className="horizontal-line" />
        <div  style={{color:'red' , fontSize:'0.5rem'}} >{error}</div>
        <form   className="Form"  {...nextFlag?{style : {display:'none'}} : {style:{display:'flex'}}} onSubmit={(e) => handleNext(e)}>
          <p>User details</p>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}

              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select className="select-class" name="role" id="role"  onChange={(e)=>{setRole(e.target.value)}} >
              <option value="customer">Customer</option>
              <option value="customer">Vendor</option>
              <option value="customer">Admin</option>
            </select>
          </div>

          <button className="register-btn" type="submit">Next</button>
          <p class="login-text">Already have an account? <a onClick={()=>navigate('/login')}>Login</a></p>
        </form>

        <form   className="Form"  {...nextFlag? {style:{display:'flex'}} : {style : {display:'none'}}} onSubmit={(e) => handleSignup(e)}>
          <p className="address-upper-detail" ><img  onClick={handleNext} src={arrow} alt="" />Address Details</p>
          <div className="form-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              name="street"
              id="street"
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              name="state"
              id="state"
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="postalCode">Postal code</label>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              onChange={(e) => setPostalCode(e.target.value)}

            />
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              id="country"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <button className="register-btn" type="submit">Register</button>
          <p class="login-text">Already have an account? <a onClick={()=>navigate('/login')}>Login</a></p>
        </form>

      </div>
    </>
  );
}

export default Signup;





