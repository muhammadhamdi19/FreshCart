import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { useContext, useEffect } from "react";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishlistContext";

const Navbar = () => {
  const nav = useNavigate();
  const { token, setToken } = useContext(authContext);
  const { numOfItems } = useContext(cartContext);
  const { numOfItemsWishlist } = useContext(wishlistContext);

  function logout() {
    setToken(null);
    localStorage.removeItem("tkn");
    nav("/Login");
  }  
  return (
    <>
      <nav className="bg-gray-100  fixed w-full z-20 top-0 start-0 border-b border-gray-200 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/FreshCart/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Fresh cart Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap "></span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {token ? (
              <div>
                <NavLink to="/cart">
                  <i className="fa-solid fa-cart-shopping me-3 md:me-8 text-gray-500 relative hover:text-black cursor-pointer transition-all duration-100 text-2xl">
                    <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 border-2 border-white rounded-full -top-3 -end-3 ">
                      {numOfItems}
                    </div>
                  </i>
                </NavLink>
                <button
                  onClick={logout}
                  className="text-white mr-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-white mr-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
                      : " mr-2 bg-white border-green-700 border hover:text-white transition-all duration-75 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center  "
                  }
                  to={"/login"}
                >
                  Login
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-white mr-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center "
                      : " mr-2 bg-white border-green-700 border hover:text-white transition-all duration-75 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center  "
                  }
                  to={"/register"}
                >
                  Register
                </NavLink>
              </>
            )}

            {token ? <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>:""}
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col  p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-100 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-100  ">
              {token ? (
                <>
                  <li>
                    <NavLink
                      to="/FreshCart/"
                      className={({ isActive }) =>
                        isActive
                          ? "block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 "
                          : "block py-2 relative px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0  "
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/wishlist"
                      className={({ isActive }) =>
                        isActive
                          ? "block relative py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 "
                          : "block py-2 relative px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0  "
                      }
                    >
                      Wishlist
                      <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 border-2 border-white rounded-full -top-3 -end-3 ">
                        {numOfItemsWishlist}
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/products"
                      className={({ isActive }) =>
                        isActive
                          ? "block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 "
                          : "block py-2 relative px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0  "
                      }
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/allorders"
                      className={({ isActive }) =>
                        isActive
                          ? "block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 "
                          : "block py-2 relative px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0  "
                      }
                    >
                      Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/categories"
                      className={({ isActive }) =>
                        isActive
                          ? "block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 "
                          : "block py-2 relative px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0  "
                      }
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/brands"
                      className={({ isActive }) =>
                        isActive
                          ? "block py-2 px-3 text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 "
                          : "block py-2 relative px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0  "
                      }
                    >
                      Brands
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
