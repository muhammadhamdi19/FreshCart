import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { MutatingDots } from "react-loader-spinner";

const AllOrders = () => {
  const { id } = jwtDecode(localStorage.getItem("tkn"));

  const [allorders, setAllorders] = useState([]);
  const [loader, setLoader] = useState(false);

  async function getAllOrders() {
    setLoader(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
      );
      console.log(data);
      setAllorders(data);
      setLoader(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  }
  useEffect(() => {
    getAllOrders();
  }, []);

  if (loader) {
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
        <title>FreshCart - All Orders</title>
      </Helmet>
      <section className="py-24">
        <h2 className="text-4xl text-center text-green-700 font-semibold mb-10">
          All Orders
        </h2>
        <div className="w-[90%]  mx-auto">
          <div className="row bg-gray-100 ">
            {allorders
              ? allorders.map(function (order, idx) {
                  return (
                    <div key={idx} className="card p-14 ">
                      <div className="inner border-b-2">
                        <div className="flex justify-between flex-wrap">
                          <h2 className="font-semibold md:text-2xl ">
                            Order Price :{" "}
                            <span className="font-semibold md:text-2xl text-green-700 ">
                              {order.totalOrderPrice}
                            </span>
                          </h2>
                          <h2 className="font-semibold md:text-2xl ">
                            Payment Method :{" "}
                            <span className="font-semibold md:text-2xl text-green-700 capitalize">
                              {order.paymentMethodType}
                            </span>
                          </h2>
                          <h2 className="font-semibold md:text-2xl ">
                            Delivered :{" "}
                            <span className="font-semibold md:text-2xl text-green-700 ">
                              {order.isDelivered == false
                                ? "On The Way"
                                : "Yes"}
                            </span>
                          </h2>
                          <h2 className="font-semibold md:text-2xl ">
                            Paid :{" "}
                            <span className="font-semibold md:text-2xl text-green-700 ">
                              {order.isPaid == false ? "Not Yet" : "Yes"}
                            </span>
                          </h2>
                        </div>
                        <div className="flex flex-wrap w-full  my-16">
                          {order.cartItems?.map(function (item, idx) {
                            return (
                              <div key={idx} className="lg:w-1/4 ">
                                <div className="inner mx-3">
                                  <img
                                    src={item.product.imageCover}
                                    className="w-full mb-9"
                                    alt="product photo"
                                  />
                                  <div className="flex  justify-between items-center mb-9 px-5">
                                    <h2 className="font-semibold md:text-lg">
                                      Count :{" "}
                                      <span className="font-semibold md:text-lg text-green-700">
                                        {item.count}
                                      </span>
                                    </h2>
                                    <h2 className="font-semibold md:text-lg">
                                      Price :{" "}
                                      <span className="text-green-700 font-semibold md:text-lg ">
                                        {item.price}
                                      </span>
                                    </h2>
                                    <p className="font-semibold md:text-lg">
                                      <span>
                                        <i className="fa-solid fa-star text-yellow-400 me-2"></i>
                                      </span>
                                      {item.product.ratingsAverage}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </section>
    </>
  );
};

export default AllOrders;
