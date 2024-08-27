import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MutatingDots, TailSpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { wishlistContext } from "../../Context/WishlistContext";
import { Helmet } from "react-helmet";

const ProductDetails = () => {
  const { id } = useParams();

  const [loader, setLoader] = useState(false);

  const { addProduct } = useContext(cartContext);

  const {
    addProductToWishlist,
    productsInWishlist,
    deleteProductFromWishlist,
    getUserWishlist,
  } = useContext(wishlistContext);

  async function getProductDetails() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }

  async function addProductToCart() {
    setLoader(true);
    const data = await addProduct(id);

    console.log(data);

    if (data) {
      toast.success(data.message);

      setLoader(false);
    } else {
      toast.error("error");
      setLoader(false);
    }
  }

  async function deleteProduct() {
    const data = await deleteProductFromWishlist(id);

    console.log(data);

    if (data) {
      toast.success(data.message);
    } else {
      toast.error("error");
    }
  }

  async function addToWishlist() {
    const data = await addProductToWishlist(id);

    console.log(data.data);
    console.log(productsInWishlist);

    if (data) {
      toast.success(data.message);
    } else {
      toast.error("error");
    }
  }

  useEffect(() => {
    getUserWishlist();
  }, [productsInWishlist]);

  const { data, isLoading } = useQuery("productDetails", getProductDetails);
  console.log(data?.data.data);

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
      <Helmet>
        <title>FreshCart - Products Details</title>
      </Helmet>
      <section className="py-10">
        <div className="w-[90%] md:w-[80%] mx-auto">
          <div className="row flex flex-wrap justify-center items-center mt-20">
            <div className="w-full md:w-[32%] ">
              <div className="inner">
                <img
                  src={data?.data.data.imageCover}
                  className="w-full"
                  alt=""
                />
              </div>
            </div>

            <div className="w-full md:w-[65%] ms-8 ">
              <div className="inner flex flex-col justify-center">
                <h2 className="font-semibold text-4xl">
                  {data?.data.data.title.split(" ").slice(0, 2).join(" ")}
                </h2>
                <p className="mt-6">{data?.data.data.description}</p>
                <div className="flex justify-between items-center mt-6">
                  <p>{data?.data.data.price} EGP</p>
                  <p>
                    <span>
                      <i className="fa-solid fa-star text-yellow-400 me-2"></i>
                    </span>
                    {data?.data.data.ratingsAverage}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-5">
                  <button
                    onClick={addProductToCart}
                    type="button"
                    className="focus:outline-none text-white w-[80%]  bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    {loader == true ? (
                      <div className="flex justify-center">
                        <TailSpin
                          visible={true}
                          height="30"
                          width="30"
                          color="#fff"
                          ariaLabel="tail-spin-loading"
                          radius="1"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      </div>
                    ) : (
                      "Add To Cart"
                    )}
                  </button>
                  {productsInWishlist.some(
                    (item) => item.id === data?.data.data.id
                  ) ? (
                    <i
                      onClick={deleteProduct}
                      className="fa-solid fa-heart text-green-600 fa-2xl md:fa-2xl cursor-pointer"
                    ></i>
                  ) : (
                    <i
                      onClick={addToWishlist}
                      className="fa-regular fa-heart text-green-600 fa-2xl md:fa-2xl cursor-pointer"
                    ></i>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
