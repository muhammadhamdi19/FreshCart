import { useQuery } from "react-query";
import Slider from "react-slick";
import axios from "axios";

function CategorySlider() {
  var settings = {
    dots: true,
    infinite: true,

    slidesToShow: 6,
    slidesToScroll: 4,
    autoplay: true,
    speed: 2000,

    cssEase: "linear",
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  async function categorySlider() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data } = useQuery("CategorySlider", categorySlider);

  return (
    <div className="slider-container md:w-[95%] mx-auto">
      <Slider {...settings}>
        {data?.data.data.map(function (item, idx) {
          return (
            <div key={idx}>
              <img src={item.image} className="w-full h-[254px]" alt="" />
              <h3 className="text-center text-xl mt-4 font-semibold mb-5">
                {item.name}
              </h3>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default CategorySlider;
