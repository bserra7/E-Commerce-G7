import React from 'react'

const SliderContent = ({activeIndex, dataSlider}) => {
  return (
    <section>
      {dataSlider.map((slide, index) => (
        <div key={index} className={index === activeIndex ? "slides active" : "inactive"}>
          <img className='slide-image' src={slide.urls} alt="" />
        </div>
      ))}
    </section>
  )
}

export default SliderContent