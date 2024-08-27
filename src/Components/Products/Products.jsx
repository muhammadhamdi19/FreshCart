import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishlistContext } from "../../Context/WishlistContext";
import { MutatingDots } from "react-loader-spinner";
import { Helmet } from "react-helmet";

const Products = () => {
  const { addProduct } = useContext(cartContext);
  const {
    addProductToWishlist,
    productsInWishlist,
    getUserWishlist,
    deleteProductFromWishlist,
  } = useContext(wishlistContext);

  const [products, setProducts] = useState([]);

  async function getAllProducts() {
    const data = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    return data;
  }

  useEffect(() => {
    getUserWishlist();
  }, [productsInWishlist]);

  async function addProductToCart(id) {
    const data = await addProduct(id);

    // console.log(data);

    if (data) {
      toast.success(data.message);
    } else {
      toast.error("error");
    }
  }

  const { data, isLoading } = useQuery("products", getAllProducts);

  // console.log(data?.data.data);

  async function search(value) {
    const searchValue = value.toLowerCase();

    // Filter the products based on the search value
    const filteredProducts = data?.data.data.filter((item) =>
      item.title.toLowerCase().includes(searchValue)
    );

    // Update the state with the filtered products
    setProducts(filteredProducts);
  }

  async function addToWishlist(id) {
    const data = await addProductToWishlist(id);
    console.log(data);

    if (data) {
      toast.success(data.message);
    } else {
      toast.error("error");
    }
  }

  if (isLoading) {
    return (
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
    );
  }

  return (
    <>
      <div className="allproduct py-28">
        <div className=" w-[90%] md:w-[80%] mx-auto">
          <input
            onChange={(e) => {
              search(e.target.value);
            }}
            type="search"
            id="productSearch"
            className="block w-full py-3 mb-8 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 focus:outline-none "
            placeholder="Search..."
          />

          <div className="row flex flex-wrap gap-4 ">
            {products && products.length > 0 ? (
              products.map(function (item, idx) {
                return (
                  <>
                    <div
                      key={idx}
                      className="card  cursor-pointer w-full md:w-[23%]  rounded-lg hover:border-2 hover:scale-105 hover:md:scale-110 transition-all duration-300"
                    >
                      <div className="inner p-4">
                        <Link to={`/productDetails/${item._id}`}>
                          <img
                            src={item.imageCover}
                            className="w-full mb-4"
                            alt="product photo"
                          />
                          <h3 className=" text-md text-green-700 mb-4">
                            {item.category.name}
                          </h3>
                          <h3 className="font-semibold mb-4">
                            {item.title.split(" ").slice(0, 2).join(" ")}
                          </h3>
                          <div className="flex justify-between items-center">
                            <p>{item.price} EGP</p>
                            <p>
                              <span>
                                <i className="fa-solid fa-star text-yellow-400 me-2"></i>
                              </span>
                              {item.ratingsAverage}
                            </p>
                          </div>
                        </Link>
                        <div className="flex justify-between items-center mt-5">
                          <button
                            onClick={() => {
                              addProductToCart(item._id);
                            }}
                            type="button"
                            className="focus:outline-none text-white w-[80%]  bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5   "
                          >
                            Add To Cart
                          </button>
                          <i
                            onClick={() => {
                              addToWishlist(item._id);
                            }}
                            className="fa-regular fa-heart text-green-600 fa-2xl md:fa-2xl cursor-pointer "
                          ></i>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div className="row flex flex-wrap gap-4">
                {data?.data.data.map(function (item, idx) {
                  return (
                    <div
                      key={idx}
                      className="card cursor-pointer w-full md:w-[23%]  rounded-lg hover:border-2 hover:scale-105 hover:md:scale-110 transition-all duration-300"
                    >
                      <div className="inner p-4">
                        <Link to={`/productDetails/${item._id}`}>
                          <img
                            src={item.imageCover}
                            className="w-full mb-4"
                            alt="product photo"
                          />
                          <h3 className=" text-md text-green-700 mb-4">
                            {item.category.name}
                          </h3>
                          <h3 className="font-semibold mb-4">
                            {item.title.split(" ").slice(0, 2).join(" ")}
                          </h3>
                          <div className="flex justify-between items-center">
                            <p>{item.price} EGP</p>
                            <p>
                              <span>
                                <i className="fa-solid fa-star text-yellow-400 me-2"></i>
                              </span>
                              {item.ratingsAverage}
                            </p>
                          </div>
                        </Link>
                        <div className="flex justify-between items-center mt-5">
                          <button
                            onClick={() => {
                              addProductToCart(item._id);
                            }}
                            type="button"
                            className="focus:outline-none text-white w-[80%]  bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5   "
                          >
                            Add To Cart
                          </button>
                          {productsInWishlist.some(
                            (heart) => heart.id === item.id
                          ) ? (
                            <i
                              onClick={() => {
                                deleteProductFromWishlist(item.id);
                              }}
                              className="fa-solid fa-heart text-green-600 fa-2xl md:fa-2xl cursor-pointer"
                            ></i>
                          ) : (
                            <i
                              onClick={() => {
                                addToWishlist(item.id);
                              }}
                              className="fa-regular fa-heart text-green-600 fa-2xl md:fa-2xl cursor-pointer"
                            ></i>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
