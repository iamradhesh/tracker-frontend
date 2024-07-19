import React from 'react';
import './SuccessPage.css';
import img from '../../assets/img-1.png';
import Navbar from '../Navbar/Navbar';
import img1 from '../../assets/SVGs/img.svg';
import Footer from '../Footer/Footer';

const SuccessPage = () => {

    function handleOnclick(){
        window.location.href="/tracking-page"
    }
  return (
    <div className='success-container h-full w-full relative border-teal-100'>
        <Navbar color={"white"}/>
      <img src={img} alt='' className="w-full h-full object-cover" />
      <div className='success-msg'>
            <div className='bar'></div>
            <div className='success-icon'>
            <img src={img1} alt='' />
            </div>
            <div className='heading-container'>
                <h1 className='font-semibold'>Login Successful</h1>
            </div>
            
            <div className='btn-div'>
            <button className='btn' onClick={handleOnclick} >Go to Tracking Page</button>
            </div>
            
      </div>
      <Footer color={"gray-500"}/>
    </div>
  )
}

export default SuccessPage;
