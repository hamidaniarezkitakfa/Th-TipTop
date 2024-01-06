import React from 'react';
import './home.css';
import AboutUs from '../../components/about';
import Countdown from '../../components/down';
import ParticipateButton from '../../components/button';
import Testimonials from '../../components/notice';
import NewsletterSignup from '../../components/news';
import Slide  from '../../components/slide/Slide';
import {cards} from '../../../data';
import AcademicWarning from '../../components/academicWarning';

const Home = () => {
  return (
    <div className="homeContainer">
      <Slide data={cards} slidesPerView={1} />
      <AboutUs />
      <Countdown />
      <ParticipateButton />
      <Testimonials />
      <AcademicWarning />
      <NewsletterSignup />
    </div>
  );
}

export default Home;
