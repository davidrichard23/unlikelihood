import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './nav_bar';

export default props => {
  return (
    <div className='splash-page'>
      <Nav />

      <div className="wrapper">
        <section className='section-one'>
          <div className="left">
            <h1>Invest for Free</h1>
            <p>Invest in stocks, ETFs, options, and cryptocurrencies, all commission-free, right from your phone or desktop.</p>
            <Link className='btn round-btn' to='/signup'>Sign Up</Link>
          </div>
          <div className="right">
            <div style={{marginRight: -130}}>
            <img src='https://d2ue93q3u507c2.cloudfront.net/assets-about/6b2e66f81aef0f0d7dbeef37392e0eca.png' />
            </div>
          </div>
        </section>
        <section className='section-two'>
          <h3>Cash management, coming soon.</h3>
        </section>
      </div>
    </div>
  );
};