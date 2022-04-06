
import React, { useState } from 'react'
import { useEffect } from 'react';
import Arrows from './Arrows'
import dataSlider from './dataSlider'
import Dots from './Dots';
import SliderContent from './SliderContent'

const len = dataSlider.length - 1;

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [activeIndex])

  return (
    <div className="container">
      <div className='slider-container'>
        <SliderContent
          activeIndex={activeIndex}
          dataSlider={dataSlider} />
        <Arrows
          prevSlide={() => setActiveIndex(activeIndex < 1 ? len : activeIndex - 1)}
          nextSlide={() => setActiveIndex(activeIndex === len ? 0 : activeIndex + 1)}
        />
        <Dots
          activeIndex={activeIndex}
          dataSlider={dataSlider}
          onclick={(activeIndex) => setActiveIndex(activeIndex)} />
      </div>
    </div>
  )
}

export default Slider
