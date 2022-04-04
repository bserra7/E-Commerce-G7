import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BtnSlider from './BtnSlider';
import dataSlider from './dataSlider';

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataSlider.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <div className="container-slider">
      {dataSlider.map((slider, index) => {
        return (
          <Link
            to="/shop"
            className={slideIndex === index + 1 ? 'slide active-anim' : 'slide'}
            key={slider.id}
          >
            <img
              src={process.env.PUBLIC_URL + `images/${index + 1}.jpeg`}
              alt=""
            />
          </Link>
        );
      })}
      <BtnSlider moveSlide={nextSlide} direction={'next'} />
      <BtnSlider moveSlide={prevSlide} direction={'prev'} />

      <div className="container-dots">
        {Array.from({ length: 5 }).map((item, index) => (
          <div
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? 'dot active' : 'dot'}
            key={Math.random().toString(16).slice(2)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
