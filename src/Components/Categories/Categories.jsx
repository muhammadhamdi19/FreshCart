import axios from "axios";
import { Helmet } from "react-helmet";
import { MutatingDots } from "react-loader-spinner";
import { useQuery } from "react-query";

const Categories = () => {
  async function getAllCategories() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery("getAllCategories", getAllCategories);

  console.log(data?.data.data, isLoading);

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
        <title>FreshCart - Categories</title>
      </Helmet>
      <section className="py-10 mt-32">
        <div className="w-[90%] mx-auto">
          <div className="row flex flex-wrap">
            {data?.data.data.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="card w-full md:w-1/3 group cursor-pointer"
                >
                  <div className="inner border mx-3 mb-5 rounded-lg  ">
                    <div className=" overflow-hidden">
                      <img
                        src={item.image}
                        className="w-full h-96 scale-110 rounded-lg group-hover:scale-150 transition-all duration-700"
                        alt=""
                      />
                    </div>
                    <h3 className="font-semibold text-2xl text-green-700 py-6 text-center overflow-hidden">
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

export default Categories;
