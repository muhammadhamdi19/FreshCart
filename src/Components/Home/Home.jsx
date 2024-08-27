import HomeSlider from "../HomeSlider/HomeSlider";
import staticSlide1 from "../../assets/images/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379.jpg";
import staticSlide2 from "../../assets/images/XCM_Manual_1533480_5305769_379x304_1X-_SY304_CB616236518_.jpg";
import CategorySlider from "../CategorySlider/CategorySlider";
import Products from "../Products/Products";
import { MutatingDots } from "react-loader-spinner";
import { useQuery } from "react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import Login from "../Login/Login";

const Home = () => {
  async function getAllProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { isLoading } = useQuery("products", getAllProducts);

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
      {localStorage.getItem("tkn") != null ? <><Helmet>
        <title>FreshCart - Home</title>
      </Helmet>
      <section className="py-28 ">
        <div className="slider w-full md:w-[80%] mx-auto mb-20 flex ">
          <div className="dynamic w-[65%] lg:w-[75%] ">
            <HomeSlider />
          </div>
          <div className="staticw-[35%] lg:w-[25%] h-[250px] md:h-[350px] lg:h-[470px] flex flex-wrap gap-x-0">
            <img src={staticSlide1} className="w-full h-[50%]" alt="" />
            <img src={staticSlide2} className="w-full h-[50%]" alt="" />
          </div>
        </div>
      </section>

      <section className="categorySlider ">
        <CategorySlider />
      </section>

      <section>
        <Products />
      </section> </> : <Login/>}
    </>
  );
};

export default Home;
