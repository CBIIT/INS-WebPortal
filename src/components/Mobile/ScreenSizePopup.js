/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';

const ScreenSizePopup = () => {
  const recommendedScreenSize = 1280;
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [showPopup, setShowPopup] = useState(window.innerWidth < recommendedScreenSize);

  const styles = {
    popup: {
      position: 'fixed',
      top: '20%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      borderRadius: '8px',
      zIndex: 1000,
    },
    button: {
      marginTop: '10px',
      padding: '8px 16px',
      cursor: 'pointer',
    },
  };

  useEffect(() => {
    const handleResize = () => {
      const newSize = window.innerWidth;
      setScreenSize(newSize);
      setShowPopup(newSize < recommendedScreenSize);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    showPopup && (
      <div style={styles.popup}>
        <p>
          The maximum size of your current screen is
          {' '}
          {screenSize}
          px. To use all features of the INS, we recommend accessing it from a computer or other device with a minimum screen size of
          {' '}
          {recommendedScreenSize}
          px.
        </p>
        <button type="button" onClick={() => setShowPopup(false)} style={styles.button}>Close</button>
      </div>
    )
  );
};

export default ScreenSizePopup;
