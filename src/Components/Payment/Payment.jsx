import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { Helmet } from "react-helmet";
// import * as Yup from "yup"

const Payment = () => {
  const { cartId } = useContext(cartContext);
  const [loading, setLoading] = useState(false);

  const values = {
    shippingAddress: {
      details: "",
      phone: "",
      city: "",
    },
  };

  async function payment(values) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        values,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        }
      );
      setLoading(false);

      window.open(data.session.url);
      console.log(data);

      toast.success(data.status);
    } catch (error) {
      toast.error("error");
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: values,
    onSubmit: payment,
  });
  return (
    <>
      <Helmet>
        <title>FreshCart - Payment</title>
      </Helmet>
      <section className="py-24">
        <h2 className="text-4xl text-center text-green-700 font-semibold">
          Payment
        </h2>
        <div className="w-[70%] mx-auto mt-12">
          <form onSubmit={formik.handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                onChange={formik.handleChange}
                value={formik.values.shippingAddress.city}
                onBlur={formik.handleBlur}
                type="text"
                name="shippingAddress.city"
                id="city"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="city"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
              >
                City
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                value={formik.values.shippingAddress.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="tel"
                name="shippingAddress.phone"
                id="Phone"
                className="block mt-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="Phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <textarea
                value={formik.values.shippingAddress.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="shippingAddress.details"
                id="message"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-green-600 peer "
                placeholder=" "
              ></textarea>
              <label
                htmlFor="message"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 "
              >
                Details
              </label>
            </div>

            <button
              type="submit"
              className="text-white mt-5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              {loading == true ? (
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
                "Cash Payment"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Payment;
