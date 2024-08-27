import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const wishlistContext = createContext();

const WishlistContextProvider = ({ children }) => {
  const [numOfItemsWishlist, setNumOfItemsWishlist] = useState(0);
  const [productsInWishlist, setProductsInWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  async function addProductToWishlist(productId) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: productId,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setNumOfItemsWishlist(data.data.length);
      setProductsInWishlist(data?.data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserWishlist() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      setNumOfItemsWishlist(data.data.length);
      setProductsInWishlist(data?.data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  

  async function deleteProductFromWishlist(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      setNumOfItemsWishlist(data.data.length);
      setProductsInWishlist(data?.data);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(function () {
    getUserWishlist();
  }, []);
  return (
    <wishlistContext.Provider
      value={{
        addProductToWishlist,
        loading,
        deleteProductFromWishlist,
        getUserWishlist,
        numOfItemsWishlist,
        productsInWishlist,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
};

export default WishlistContextProvider;
