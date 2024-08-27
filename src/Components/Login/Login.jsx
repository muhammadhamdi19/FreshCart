import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "../../Context/AuthContext";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet";
import Home from "../Home/Home";

const Login = () => {
  const nav = useNavigate();

  const { setToken } = useContext(authContext);

  const [loading, setLoading] = useState(false);
  const user = {
    email: "",
    password: "",
  };

  const validation = Yup.object().shape({
    email: Yup.string().required("Email is required").email(),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must have latters and numbers"
      ),
  });

  async function userLogin(values) {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      console.log(res);
      toast.success(res.data.message);
      setLoading(false);
      setToken(res.data.token);
      localStorage.setItem("tkn", res.data.token);
      nav("/FreshCart/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: user,
    onSubmit: userLogin,
    validationSchema: validation,
  });
  return (
    <>
      
        <Helmet>
        <title>FreshCart - Login</title>
      </Helmet>
      <h2 className="text-5xl text-center text-green-700 font-bold mt-28">
        Login
      </h2>

      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-16">
        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            name="email"
            id="email"
            className="block mt-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          {formik.errors.email && formik.touched.email ? (
            <div>
              <label
                htmlFor="email"
                className="absolute text-sm text-red-600 dark:text-red-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Email
              </label>
              <p
                id="email_help"
                className="mt-2 text-xs text-red-600 dark:text-red-400"
              >
                <span className="font-medium">Error </span>
                {formik.errors.email}
              </p>
            </div>
          ) : (
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="password"
            id="password"
            className="block mt-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          {formik.errors.password && formik.touched.password ? (
            <div>
              <label
                htmlFor="password"
                className="absolute text-sm text-red-600 dark:text-red-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Password
              </label>
              <p
                id="password_help"
                className="mt-2 text-xs text-red-600 dark:text-red-400"
              >
                <span className="font-medium">Error </span>
                {formik.errors.password}
              </p>
            </div>
          ) : (
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          )}
        </div>

        <div className="flex justify-between items-center mt-10">
          <button
            type="submit"
            className="text-white  bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
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
              "Login"
            )}
          </button>

          <Link to="/forgetPassword" className="font-medium underline">
            Forget Password?
          </Link>
        </div>
      </form>

      <Footer />
      
    </>
  );
};

export default Login;
