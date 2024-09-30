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
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword , setConfirmPassword] = useState() ; 
  const [error , setError] = useState() ; 



  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("please wait..")
    const formdata = new FormData();


    if(password!==confirmPassword){
      setError("Please Write Correct Password") ; 
      return ;   
    }

    const userObj = {
      firstName , lastName , email  , password 
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/um/user-request",
        userObj
      );
      console.log(res.data);
      navigate("/signup/verify-otp", { state: email });
    } catch (error) {
      setError('something went wrong while registering')
      console.error("Error during signup:", error);
    }
  };


  return (
    <>
      <div className="form-block">
        <div  style={{color:'blue' , fontSize:'0.5rem'}} >{error}</div>
        <form   className="Form"  onSubmit={(e) => handleSignup(e)}>
          <div className="form-group">
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="FirstName *"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="lastName"
              value={lastName}
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="LastName"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email ID *"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password *"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              value={confirmPassword}
              id="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password *"
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





