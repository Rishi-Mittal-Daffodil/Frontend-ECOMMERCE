import React, { useEffect, useState } from "react";
import Slider from "../slider/Slider";
// import Cardslider from "../cardslider/Cardslider";
import Card from "../product card/Card";
import "./Home.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CategoryCard from "../category card/CategoryCard";

const newArrivalSampleData = [
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1727526806_8752720.jpg?format=webp&w=480&dpr=1.0",
    title: "TSS Originals: Cloud Blue (Colourblock)",
    desc: "Easy Fit Vests",
    price: "799",
  },
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1727530524_6312965.jpg?format=webp&w=480&dpr=1.0",
    title: "Bloom: Ticket To Nowhere",
    desc: "Holiday Shirts",
    price: "1499",
  },
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1727521549_7151108.jpg?format=webp&w=480&dpr=1.0",
    title: "TSS Originals: Anti-Human",
    desc: "Oversized T-Shirts",
    price: "899",
  },
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1727526201_8114589.jpg?format=webp&w=480&dpr=1.0",
    title: "Squid Game: High Stakes",
    desc: "Men Oversized Joggers",
    price: "1699",
  },
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1727533140_7644520.jpg?format=webp&w=480&dpr=1.0",
    title: "Peanuts: Snoopy's Drive In",
    desc: "Holiday Shirts",
    price: "1399",
  },
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1727520852_5688194.jpg?format=webp&w=480&dpr=1.0",
    title: "TSS Originals: Astral",
    desc: "Shirts",
    price: "1499",
  },
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1727525919_4010916.jpg?format=webp&w=480&dpr=1.0",
    title: "TSS Originals: Clay",
    desc: "Oversized Polos",
    price: "1299",
  },
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1727525327_6928807.jpg?format=webp&w=480&dpr=1.0",
    title: "Colourblock: Shades Of Grey",
    desc: "Oversized T-Shirts",
    price: "999",
  },
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1727534285_4448386.jpg?format=webp&w=480&dpr=1.0",
    title: "TSS Originals: Anthrea",
    desc: "Men Joggers",
    price: "1499",
  },
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1727524704_8171374.jpg?format=webp&w=480&dpr=1.0",
    title: "Solids: Midnight Black",
    desc: "Korean Joggers",
    price: "1699",
  },
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1727522560_2449195.jpg?format=webp&w=480&dpr=1.0",
    title: "TSS Originals: Thirsty Crow",
    desc: "Holiday Shirts",
    price: "1499",
  },
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1727532266_4970455.jpg?format=webp&w=480&dpr=1.0",
    title: "TSS Originals: Souls",
    desc: "Oversized Pullovers",
    price: "1999",
  },
];

const sampleCategoryData = [
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Polos_3_MhOXiPK.jpg?format=webp&w=480&dpr=1.0",
    CategoryName: "Polo T-Shirts",
  },
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/T-Shirts_1_7WntU0V.jpg?format=webp&w=480&dpr=1.0",
    CategoryName: "T-Shirts",
  },
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Joggers_5_pH3FJy1.jpg?format=webp&w=480&dpr=1.0",
    CategoryName: "Jogggers",
  },
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Pants_2_HN0fH0b.jpg?format=webp&w=480&dpr=1.0",
    CategoryName: "Pants",
  },
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Sweatshirts_Ui8b5kX.jpg?format=webp&w=480&dpr=1.0",
    CategoryName: "Sweatshirts",
  },
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Shirts_3_XDXGwZm.jpg?format=webp&w=480&dpr=1.0",
    CategoryName: "Shirts",
  },
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/Jeans_2_CS07z5d.jpg?format=webp&w=480&dpr=1.0",
    CategoryName: "Jeans",
  },
  {
    url: "https://prod-img.thesouledstore.com/public/theSoul/storage/mobile-cms-media-prod/product-images/SMALL_TILE_MENS14_Eoghf2e.jpg?format=webp&w=480&dpr=1.0",
    CategoryName: "Jackets",
  },
];
function Home() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState();
  useEffect(() => {
    try {
      const fetchData = async () => {
        const Data = await axios.get("http://localhost:8080/pm/product");
        setProductData(Data.data.data);
        console.log(Data.data.data);
      };
      fetchData();
    } catch (error) {
      console.log("sonmething went wrong while fetching product  ");
    }
  }, []);

  return (
    <>
      <Slider />
      <div className="home-heading">
        <h2>Categories</h2>
      </div>
      <div className="categories-data">
        {sampleCategoryData.map((item) => {
          return (
            <CategoryCard
              url={item.url}
              CategoryName={item.CategoryName}
            />
          );
        })}
      </div>
      <div className="home-heading">
        <h2>New Arrivals</h2>
      </div>
      <div className="newarrival-data">
        {newArrivalSampleData.map((item) => {
          return (
            <Card
              key={Math.random()}
              url={item.url}
              title={item.title}
              desc={item.desc}
              price={"₹ " + item.price}
            />
          );
        })}

        {productData ? (
          productData.map((item) => {
            return (
              <div
                onClick={() => {
                  navigate(`/products/${item._id}`);
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth", // Optional: adds smooth scrolling animation
                  });
                }}
              >
                <Card
                  key={item._id}
                  url={item.images[0].url}
                  title={item.name}
                  desc={"Stylish middle Wear"}
                  price={"₹ " + item.price}
                />
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Home;
