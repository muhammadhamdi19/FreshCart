// import axios from "axios"
// import { useQuery } from "react-query"

import { useContext, useEffect } from "react";
import { cartContext } from "../../Context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { MutatingDots } from "react-loader-spinner";
import { Helmet } from "react-helmet";

const Cart = () => {
  const {
    products,
    numOfItems,
    totalPrice,
    clearCart,
    deleteFromCart,
    updateCount,
    loading,
    getUserCart,
  } = useContext(cartContext);
  console.log(products);

  const nav = useNavigate();
  //   async function getCartProduct() {
  //     return await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
  //       headers:{
  //         token:localStorage.getItem("tkn")
  //       }
  //     })

  //   }

  //   const {data } = useQuery("getCartProduct",getCartProduct)
  // console.log(data?.data.data.products);

  async function clear() {
    await clearCart();
    nav("/");
  }

  useEffect(function () {
    getUserCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>FreshCart - Cart</title>
      </Helmet>
      {loading ? (
        <div className="h-screen flex justify-center items-center bg-green-600 ">
          <MutatingDots
            visible={true}
            height="150"
            width="150"
            color="#fff"
            secondaryColor="#fff"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <>
          <section className="py-20">
            <div className="w-[90%]  mx-auto">
              <div className="row bg-gray-100 mt-20">
                <div className="card p-14 ">
                  <div className="inner  ">
                    <div className="flex justify-between items-center mb-3 ">
                      <h2 className="font-semibold text-2xl lg:text-3xl ">
                        Cart Shop
                      </h2>
                      <Link
                        to="/payment"
                        className="text-white bg-gradient-to-r  from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                      >
                        Check Out
                      </Link>
                    </div>

                    {products?.length != 0 ? (
                      <>
                        <div className="flex justify-between items-center mb-8">
                          <p className="font-semibold text-md lg:text-xl ">
                            Total Price :{" "}
                            <span className="text-green-600">{totalPrice}</span>
                          </p>
                          <p className="font-semibold text-md ">
                            Total Number Of Items: :{" "}
                            <span className="text-green-600">{numOfItems}</span>
                          </p>
                        </div>
                        {products.map(function (item, idx) {
                          return (
                            <div
                              key={idx}
                              className="flex flex-wrap py-6 border-b-2 justify-center items-center  lg:justify-between "
                            >
                              <div className="lg:w-2/3  flex flex-wrap justify-start items-center">
                                <img
                                  src={item.product.imageCover}
                                  className="w-full lg:w-[25%] me-10"
                                  alt="product image"
                                />
                                <div className="flex flex-col w-full lg:w-[48%]">
                                  <h2 className="font-semibold text-3xl mb-3">
                                    {item.product.title}
                                  </h2>
                                  <p className=" text-lg mb-6">
                                    {item.price} EGP
                                  </p>
                                  <button
                                    onClick={() => {
                                      deleteFromCart(item.product.id);
                                    }}
                                    type="button"
                                    className="text-red-700  hover:text-white border border-red-700 w-full lg:w-[30%] hover:bg-red-800 focus:ring-4 focus:outline-none transition-all duration-150 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                                  >
                                    <i className="fa-solid fa-trash"></i> Delete
                                  </button>
                                </div>
                              </div>

                              <div className="lg:w-1/3  flex justify-end items-center mt-10 lg:mt-0 ">
                                <button
                                  onClick={() => {
                                    updateCount(
                                      item.product.id,
                                      item.count + 1
                                    );
                                  }}
                                  type="button"
                                  className="text-green-700  hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center  mb-2 me-4"
                                >
                                  +
                                </button>
                                <p>{item.count}</p>
                                <button
                                  onClick={() => {
                                    updateCount(
                                      item.product.id,
                                      item.count - 1
                                    );
                                  }}
                                  type="button"
                                  className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center me-2 ms-4 mb-2 "
                                >
                                  -
                                </button>
                              </div>
                            </div>
                          );
                        })}
                        <div className="flex justify-center items-center">
                          <button
                            onClick={clear}
                            type="button"
                            className="text-red-700 w-full lg:w-[20%] hover:text-white border mt-8 border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
                          >
                            Clear Cart
                          </button>
                        </div>
                      </>
                    ) : (
                      <h2 className="text-4xl text-center text-green-700 font-bold">
                        Your Cart Is Empty
                      </h2>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Cart;
