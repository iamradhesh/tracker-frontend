import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../../assets/img-1.png';
import img2 from '../../assets/img-2.png';
import img3 from '../../assets/img-3.png';
import './onboarding.css';

const OnboardingSlider = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const slidesData = [
    {
      img: img1,
      text: 'We serve incomparable delicacies',
      subtext: "All the best restaurants with their top menu waiting for you, they can't wait for your order!!",
    },
    {
      img: img2,
      text: 'We serve incomparable delicacies',
      subtext: "All the best restaurants with their top menu waiting for you, they can't wait for your order!!",
    },
    {
      img: img3,
      text: 'We serve incomparable delicacies',
      subtext: "All the best restaurants with their top menu waiting for you, they can't wait for your order!!",
    },
  ];

  const handleRedirectToLogin = () => {
    window.location.href = '/login'; // Navigate to /login route and reload the page
  };

  return (
    <div className='onboarding-slider relative h-full w-full'>
      <Slider {...settings} ref={sliderRef}>
        {slidesData.map((slide, index) => (
          <div key={index} className='slide-container h-full'>
            <img src={slide.img} alt={slide.text} className="w-full h-full object-cover" />
            <div className='slide-content -z-40'>
              <h2 className='text-2xl font-bold'>{slide.text}</h2>
              <p className='mt-2'>{slide.subtext}</p>
              <div className="button-container group group-hover:cursor-pointer">
                {index < 2 ? (
                  <>
                    <button className="text-white group-hover:cursor-pointer">Skip</button>
                    <button className="text-white group-hover:cursor-pointer" onClick={() => sliderRef.current.slickNext()}>
                      Next →
                    </button>
                  </>
                ) : (
                  <button className="progress-button absolute bottom-4 right-4" onClick={handleRedirectToLogin}>
                    <span className="icon">→</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OnboardingSlider;
