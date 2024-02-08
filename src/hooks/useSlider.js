import { useState, useEffect } from "react";

const useSlider = (slides) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const length = slides?.length;

  const isEqualtoArray = currentSlide === length - 4;
  const isEqualtoZero = currentSlide === 0;

  useEffect(() => {
    if (isEqualtoArray === false) {
      setCurrentSlide(0);
    }
  }, [isEqualtoArray, length]);

  function nextSlide() {
    setCurrentSlide(isEqualtoArray ? currentSlide : currentSlide + 1);
  }

  function prevSlide() {
    setCurrentSlide(isEqualtoZero ? currentSlide : currentSlide - 1);
  }

  return {
    currentSlide,
    isEqualtoArray,
    isEqualtoZero,
    nextSlide,
    prevSlide,
  };
};

export default useSlider;
