/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';

const ScreenSizePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [userScreenSize, setUserScreenSize] = useState(window.innerWidth);
  const recommendedScreenSize = 1024; // Adjust as needed

  useEffect(() => {
    const handleResize = () => {
      const newSize = window.innerWidth;
      setUserScreenSize(newSize);
      if (newSize < recommendedScreenSize) {
        setShowPopup(true);
      } else {
        setShowPopup(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    showPopup && (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        textAlign: 'center',
        zIndex: 1000,
      }}
      >
        The maximum size of your current device screen is
        {' '}
        {userScreenSize}
        px. To use all features of the INS, we recommend accessing it from a computer or other device with a minimum screen size of
        {' '}
        {recommendedScreenSize}
        px.
      </div>
    )
  );
};

export default ScreenSizePopup;
