import React from "react";
import Navbar from "../NavBar/Navbar"
import Slider from "../Slider/Slider"
import Cardslider from "../cardslider/Cardslider";
import Card from "../Card/Card";
import './Home.css'

function Home() {
  return (
    <>
      <Slider />
      <div className="home-heading" ><h2>Best Sellers</h2></div>
      <div className="home-heading" ><h2>New Arrivals</h2></div>
      {/* <Cardslider /> */}
      <Card />
    </>
  )
}

export default Home;
