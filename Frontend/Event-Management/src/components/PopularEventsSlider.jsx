import { useEffect, useState } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export default function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  // Automatically move to the next slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [current]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Image Slider */}
      <div
        className={`flex transition-transform ease-out duration-500`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s, index) => (
          <img
            key={index}
            src={s}
            alt={`Slide ${index}`}
            className="object-cover p-16 w-[100%] h-[300px] sm:h-[300px] md:h-[300px] lg:h-[600px] -z-10"
          />
        ))}
      </div>

      {/* Left and Right Arrows */}
      <div className="absolute flex justify-between w-full px-6 text-3xl text-white transform -translate-y-1/2 top-1/2">
        <button
          onClick={previousSlide}
          className="p-2 transition bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
        >
          <BsFillArrowLeftCircleFill size={30} />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 transition bg-black bg-opacity-50 rounded-full hover:bg-opacity-75"
        >
          <BsFillArrowRightCircleFill size={30} />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute flex justify-center w-full gap-2 bottom-4">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`cursor-pointer w-3 h-3 rounded-full ${
              i === current ? "bg-white" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
