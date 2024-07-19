import React, { useEffect, useState } from 'react';
import './TrackingPage.css';
import Navbar from '../Navbar/Navbar';
import img from '../../assets/img-1.png';
import Clock from '../Clock/Clock';
import axios from 'axios';

const TrackingPage = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get('https://api.quotable.io/random');
        setQuote(response.data.content);
      } catch (error) {
        console.error('Error fetching the quote', error);
      }
    };

    fetchQuote();
    const intervalId = setInterval(fetchQuote, 5000); // Fetch new quote every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className='tracking-container h-full w-full bg-transparent relative overflow-hidden'>
      <Navbar color={"white"} />
      
      <img src={img} alt='' className='w-full h-full object-cover' />
      <div className='header-container'>
      <h1 className='  h-2 w-full text-white'>Your Order is on its Way</h1>
      </div>
      
      
      <div className='container-track'>
      <Clock />
          <div className='quote-container'>
            <p className='quote-text'>{quote}</p>
          </div>
      </div>
      </div>
      
  );
};

export default TrackingPage;
