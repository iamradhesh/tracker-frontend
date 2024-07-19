import React from 'react';
import OnboardingSlider from './OnboardingSlider';
import Navbar from '../Navbar/Navbar';
import './onboarding.css';
import Footer from '../Footer/Footer';

const Onboarding = () => {
  return (
    <div className='Onboarding-container h-full w-full bg-white relative overflow-hidden'>
      <Navbar color={"white"}/>
      <OnboardingSlider />
      <Footer color={"white"}/>
    </div>
  );
}

export default Onboarding;
