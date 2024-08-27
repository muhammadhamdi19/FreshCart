import { useContext, useEffect } from "react";
import { wishlistContext } from "../../Context/WishlistContext";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { MutatingDots } from "react-loader-spinner";
import { Helmet } from "react-helmet";

const Wishlist = () => {
  const {
    productsInWishlist,
    getUserWishlist,
    loading,
    deleteProductFromWishlist,
    numOfItemsWishlist,
  } = useContext(wishlistContext);
  const { addProduct } = useContext(cartContext);

  async function addProductToCart(id) {
    const data = await addProduct(id);

    console.log(data);

    if (data) {
      toast.success(data.message);
    } else {
      toast.error("error");
    }
  }

  async function deleteProduct(id) {
    const data = await deleteProductFromWishlist(id);

    console.log(data, productsInWishlist);

    if (data) {
      toast.success(data.message);
    } else {
      toast.error("error");
    }
  }

  useEffect(
    function () {
      getUserWishlist();
    },
    [numOfItemsWishlist]
  );
  return (
    <>
      <Helmet>
        <title>FreshCart - Wishlist</title>
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
        <section className="py-20">
          <div className="w-[90%]  mx-auto">
            <div className="row bg-gray-100 mt-20">
              <div className="card p-14">
                <div className="inner  ">
                  <h2 className="font-semibold text-2xl lg:text-3xl mb-3">
                    My WishList
                  </h2>

                  {productsInWishlist?.map(function (item, idx) {
                    return (
                      <div
                        key={idx}
                        className="flex flex-wrap py-6 border-b-2 justify-center items-center  lg:justify-between "
                      >
                        <div className="lg:w-2/3  flex flex-wrap justify-start items-center">
                          <img
                            src={item.imageCover}
                            className="w-full lg:w-[25%] me-10"
                            alt="product image"
                          />
                          <div className="flex flex-col w-full lg:w-[48%]">
                            <h2 className="font-semibold text-3xl mb-3">
                              {item.title}
                            </h2>
                            <p className=" text-lg mb-6">{item.price} EGP</p>
                            <button
                              onClick={() => {
                                deleteProduct(item._id);
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
                              addProductToCart(item._id);
                            }}
                            type="button"
                            className="text-white bg-gradient-to-r w-full lg:w-[60%]  from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Wishlist;
