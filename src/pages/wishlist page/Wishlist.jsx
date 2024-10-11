import React, { useEffect, useState } from "react";
import EmptyWishlist from "../../components/empty wishlist/EmptyWishlist";
import WishlistCard from "../../components/wishlist card/WishlistCard";
import "./Wishlist.css";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import axios from "axios";
export let addToWishlist;
function Wishlist() {
  const [length, setLength] = useState(0);
  const [resData, setResData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      const getData = async () => {
        const data = await axios.get("http://localhost:8080/um/wishlist", {
          withCredentials: true,
        });
        setResData(data.data.data);
        setLength(data.data.data.length);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [length]);

  async function handleRemoveWishlistCard(id) {
    try {
      setLoading(true);
      const res = await axios.patch(
        `http://localhost:8080/um/wishlist/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("item removed from wishlist ");
      setLoading(false);
      setLength((l) => l - 1);
    } catch (error) {
      setLoading(false);
      toast.error("Something Wrong While Deleting Account");
      console.log(error);
    }
  }

  addToWishlist = async (productId) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:8080/um/wishlist/${productId}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success("Item Successfully added to wishlist ");
      setLoading(false);
      setLength((l) => l + 1);
    } catch (error) {
      setLoading(false);
      toast.error("Already in wishlist ");
      console.log(error);
    }
  };
  return (
    <>
      {loading && <Loader />}
      {length === 0 && <EmptyWishlist />}
      {length !== 0 && (
        <div className="wishlist-item">
          {resData?.map((item) => {
            return (
              <WishlistCard
                handleRemove={() => handleRemoveWishlistCard(item?._id)}
                key={item?._id}
                image={item?.images[0].url}
                name={item?.name}
                tag={item?.tags[0]}
                price={item?.price}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
export default Wishlist;
