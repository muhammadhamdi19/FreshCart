import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";

import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";

import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet";

const Register = () => {
  const nav = useNavigate();

  const [loading, setLoading] = useState(false);

  const user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };

  const validation = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(4, "Name should be at least 4 character")
      .max(15, "Maximum character for name is 15"),
    email: Yup.string().required("Email is required").email(),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must have latters and numbers"
      ),
    rePassword: Yup.string()
      .required("Repassword is required")
      .oneOf([Yup.ref("password")], "Repassword not match the password"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^(d{1,3}[- ]?)?\d{11}$/),
  });

  async function registerUser(values) {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log(res);
      toast.success(res.data.message);
      setLoading(false);
      nav("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: user,
    onSubmit: registerUser,
    validationSchema: validation,
  });

  return (
    <>
      <Helmet>
        <title>FreshCart - Register</title>
      </Helmet>
      <h2 className="text-5xl text-center text-green-700 font-bold mt-28">
        Registration Form
      </h2>

      <div className="w-[90%] mx-auto">
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto mt-16">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <div>
                <label
                  htmlFor="name"
                  className="absolute text-sm text-red-600 dark:text-red-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Name
                </label>
                <p
                  id="name_help"
                  className="mt-2 text-xs text-red-600 dark:text-red-400"
                >
                  <span className="font-medium">Error </span>
                  {formik.errors.name}
                </p>
              </div>
            ) : (
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
              </label>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="tel"
              name="phone"
              id="phone"
              className="block mt-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div>
                <label
                  htmlFor="phone"
                  className="absolute text-sm text-red-600 dark:text-red-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Phone
                </label>
                <p
                  id="phone_help"
                  className="mt-2 text-xs text-red-600 dark:text-red-400"
                >
                  <span className="font-medium">Error </span>
                  {formik.errors.phone}
                </p>
              </div>
            ) : (
              <label
                htmlFor="phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone
              </label>
            )}
          </div>

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

          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              name="rePassword"
              id="rePassword"
              className="block mt-10 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div>
                <label
                  htmlFor="repassword"
                  className="absolute text-sm text-red-600 dark:text-red-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Repassword
                </label>
                <p
                  id="standard_success_help"
                  className="mt-2 text-xs text-red-600 dark:text-red-400"
                >
                  <span className="font-medium">Error </span>
                  {formik.errors.rePassword}
                </p>
              </div>
            ) : (
              <label
                htmlFor="rePassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Repassword
              </label>
            )}
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
              "Register"
            )}
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Register;
