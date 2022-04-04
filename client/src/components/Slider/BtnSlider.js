import React from 'react';
import leftArrow from './icons/left-arrow.svg';
import rigtArrow from './icons/right-arrow.svg';

const BtnSlider = ({ direction, moveSlide }) => {
  return (
    <button
      className={direction === 'next' ? 'btn-slide next' : 'btn-slide prev'}
      onClick={moveSlide}
    >
      <img src={direction === 'next' ? rigtArrow : leftArrow} alt={direction} />
    </button>
  );
};

export default BtnSlider;
