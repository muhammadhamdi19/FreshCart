import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const email = {
    email: "",
  };

  async function forgetPassword(values) {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );

      console.log(res);
      setLoading(false);
      toast.success(res.data.message);
      navigate("/verifyRestCode");
    } catch (error) {
      console.log(error);
      toast.error("Error");
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: email,
    onSubmit: forgetPassword,
  });
  return (
    <>
      <Helmet>
        <title>FreshCart - Forget Passowrd</title>
      </Helmet>
      <section className="py-20">
        <h2 className="text-5xl text-center text-green-700 font-bold mt-12">
          Forget Password
        </h2>
        <div className="w-[90%] mx-auto mt-36">
          <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
            <div className="relative z-0 w-full mb-5 group">
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                type="email"
                name="email"
                id="email"
                className="block mt-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>
            <div className="w-full mt-10">
              <button
                type="submit"
                className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center "
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
                  "Send"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;
