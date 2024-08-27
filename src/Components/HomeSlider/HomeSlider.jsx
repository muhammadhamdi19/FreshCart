import slider1 from "../../assets/images/slider-image-1.jpeg";
import slider2 from "../../assets/images/slider-image-2.jpeg";
import slider3 from "../../assets/images/slider-image-3.jpeg";
import Slider from "react-slick";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };
  return (
    <Slider {...settings}>
      <div>
        <img
          src={slider3}
          className="w-full h-[250px] lg:h-[470px] md:h-[350px] "
          alt=""
        />
      </div>
      <div>
        <img
          src={slider2}
          className="w-full h-[250px] lg:h-[470px] md:h-[350px]  "
          alt=""
        />
      </div>
      <div>
        <img
          src={slider1}
          className="w-full h-[250px] lg:h-[470px] md:h-[350px] "
          alt=""
        />
      </div>
    </Slider>
  );
}
