import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Signup.css'
import arrow from '../../assets/arrow-back.png'

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
      firstName , lastName , email  , password , address
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



  return (
    <>
      <div className="form-block">
        <div className="upper-header">
          <h2>Register</h2>
        </div>
        <hr className="horizontal-line" />
        <div  style={{color:'red' , fontSize:'0.5rem'}} >{error}</div>
        <form   className="Form"  onSubmit={(e) => handleSignup(e)}>
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

          <button className="register-btn" type="submit">Next</button>
          <p class="login-text">Already have an account? <a onClick={()=>navigate('/login')}>Login</a></p>
        </form>
      </div>
    </>
  );
}

export default Signup;





