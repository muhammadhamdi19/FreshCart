import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Components/Layout/Layout"
import Login from "./Components/Login/Login"
import Register from "./Components/Register/Register"
import { Toaster } from "react-hot-toast"
import Home from "./Components/Home/Home"
import AuthContextProvider from "./Context/AuthContext"
import { QueryClient, QueryClientProvider } from "react-query"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import ProductDetails from "./Components/ProductDetails/ProductDetails"
import Cart from "./Components/Cart/Cart"
import CartContextProvider from "./Context/CartContext"
import Wishlist from "./Components/Wishlist/Wishlist"
import WishlistContextProvider from "./Context/WishlistContext"
import Categories from "./Components/Categories/Categories"
import Brands from "./Components/Brands/Brands"
import NotFound from "./Components/NotFound/NotFound"
import Products from "./Components/Products/Products"
import Payment from "./Components/Payment/Payment"
import AllOrders from "./Components/AllOrders/AllOrders"
import ForgetPassword from "./Components/ForgetPassword/ForgetPassword"
import VerifyResetCode from "./Components/VerifyResetCode/VerifyResetCode"
import ResetPassword from "./Components/ResetPassword/ResetPassword"


function App() {
const route = createBrowserRouter([
  {path : "/" ,element : <Layout/>, children :[
    {path :"/login" ,element:<Login/>},
    {path: "/register",element: <Register/>},
    {path: "*",element: <NotFound/>},
    {path: "/FreshCart/",element: <ProtectedRoute>
      <Home/>
    </ProtectedRoute>},
    {path: "/productDetails/:id",element: <ProtectedRoute>
      <ProductDetails/>
    </ProtectedRoute>},
    {path: "/cart",element: <ProtectedRoute>
      <Cart/>
    </ProtectedRoute>},
    {path: "/wishlist",element: <ProtectedRoute>
      <Wishlist/>
    </ProtectedRoute>},
    {path: "/categories",element: <ProtectedRoute>
      <Categories/>
    </ProtectedRoute>},
    {path: "/brands",element: <ProtectedRoute>
      <Brands/>
    </ProtectedRoute>},
    {path: "/products",element: <ProtectedRoute>
      <Products/>
    </ProtectedRoute>},
    {path: "/payment",element: <ProtectedRoute>
      <Payment/>
    </ProtectedRoute>},
    {path: "/allorders",element: <ProtectedRoute>
      <AllOrders/>
    </ProtectedRoute>},
    {path: "/forgetPassword",element:<ForgetPassword/>},
    {path: "/verifyRestCode",element:<VerifyResetCode/>},
    {path: "/restPassword",element:<ResetPassword/>},
  ]},
])

const cleint =new QueryClient()

  return (
    <>
    <QueryClientProvider client={cleint}>
    <AuthContextProvider>
      <WishlistContextProvider>
    <CartContextProvider>
    <Toaster/>
    <RouterProvider router={route}/>
    </CartContextProvider>
    </WishlistContextProvider>
    </AuthContextProvider>
    </QueryClientProvider>
    </>
  )
}

export default App
