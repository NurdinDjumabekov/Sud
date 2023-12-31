import React from 'react';
import './Preloader.scss';

export const Preloader = () => {
  return (
    <div className="preloader">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
