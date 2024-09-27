import React from "react";
import Navbar from "../NavBar/Navbar"
import Slider from "../Slider/Slider"
import './Home.css'

function Home() {
  return (
    <>
      <Slider />
      <h2 className="home-heading">Best Sellers</h2>
    </>
  )
}

export default Home;
