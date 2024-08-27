import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [numOfItems, setNumOfItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState("");
  const [loading, setLoading] = useState(false);

  async function addProduct(productId) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      );

      setProducts(data.data.products);
      setNumOfItems(data.numOfCartItems);

      setTotalPrice(data.data.totalCartPrice);
      setCartId(data.data._id);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserCart() {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      setProducts(data.data.products);
      setNumOfItems(data.numOfCartItems);

      setTotalPrice(data.data.totalCartPrice);
      setCartId(data.data._id);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function clearCart() {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setNumOfItems(0);
      setProducts([]);
      setTotalPrice(0);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteFromCart(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      setNumOfItems(data.numOfCartItems);
      setProducts(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
      setCartId(data.data._id);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCount(id, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count,
        },
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );

      setNumOfItems(data.numOfCartItems);
      setProducts(data.data.products);
      setTotalPrice(data.data.totalCartPrice);
      setCartId(data.data._id);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(function () {
    getUserCart();
  }, []);
  return (
    <cartContext.Provider
      value={{
        addProduct,
        loading,
        cartId,
        deleteFromCart,
        clearCart,
        updateCount,
        products,
        numOfItems,
        totalPrice,
        getUserCart,
        setNumOfItems,
        setProducts,
        setTotalPrice,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
