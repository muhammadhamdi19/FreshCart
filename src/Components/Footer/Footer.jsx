const Footer = () => {
  return (
    <>
      <div className="py-8 mt-20 bg-gray-100">
        <div className="container w-[90%]  mx-auto">
          <h3 className="font-bold text-xl">Get the FreshCart app</h3>
          <p className="text-sm opacity-70">
            we will send you a link, open it on your phoneto download the app
          </p>
          <div className="email flex justify-between items-center mt-5 ">
            <input
              type="email"
              placeholder="Email..."
              className=" px-4 py-1 rounded-md  w-[65%] sm:w-[70%] md:w-[80%] lg:w-[85%] xl:w-[88%] focus:outline-none"
            />
            <button
              type="button"
              className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1.5   "
            >
              Share App Link
            </button>
          </div>
          <hr className="my-8 " />
        </div>
      </div>
    </>
  );
};

export default Footer;
