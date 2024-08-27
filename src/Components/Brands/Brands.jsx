import axios from "axios";
import { Helmet } from "react-helmet";
import { MutatingDots } from "react-loader-spinner";
import { useQuery } from "react-query";

const Brands = () => {
  async function getAllBrands() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isLoading } = useQuery("getAllBrands", getAllBrands);
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
        <title>FreshCart - Brands</title>
      </Helmet>
      <section className="py-10 mt-16">
        <div className="w-[90%] mx-auto">
          <h2 className="font-semibold text-green-700 text-5xl mb-16 text-center">
            All Brands
          </h2>
          <div className="row flex flex-wrap">
            {data?.data.data.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="card w-full md:w-1/4 group cursor-pointer"
                >
                  <div className="inner border mx-3 mb-5 rounded-lg  ">
                    <div className=" overflow-hidden">
                      <img
                        src={item.image}
                        className="w-full h-48  rounded-lg group-hover:scale-110 transition-all duration-300"
                        alt=""
                      />
                    </div>
                    <h3 className="font-semibold text-xl  py-6 text-center overflow-hidden">
                      {item.name}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Brands;
