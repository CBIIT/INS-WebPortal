import React, { useState, useEffect } from 'react';

/*
 recommendedScreenSize by device:
 desktop > 990px
 990px > tablet > 480px
 480px > phone
*/

const ScreenSizePopup = () => {
  const recommendedScreenSize = 990;
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [showPopup, setShowPopup] = useState(window.innerWidth < recommendedScreenSize);

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1201,
    },
    popup: {
      position: 'fixed',
      backgroundColor: '#390156',
      color: '#fff',
      padding: '20px',
      width: '350px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      zIndex: 1202,
      textAlign: 'center',
    },
    closeButton: {
      position: 'absolute',
      top: '20px',
      right: '20px',
      fontSize: '20px',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      color: '#fff',
    },
    button: {
      margin: '80px 0 50px 0',
      padding: '10px 30px',
      backgroundColor: '#F3C758',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'Raleway',
      fontWeight: '600',
      fontSize: '14px',
      lineHeight: '100%',
      letterSpacing: '5%',
      verticalAlign: 'middle',
      textTransform: 'uppercase',
      color: '#3F3C3F',
    },
    header: {
      fontFamily: 'Inter',
      fontWeight: '400',
      fontSize: '26px',
      lineHeight: '26px',
      letterSpacing: '0px',
      marginTop: '70px',
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    content: {
      fontFamily: 'Nunito',
      fontSize: '18px',
      lineHeight: '25px',
      letterSpacing: '0%',
      marginTop: '30px',
      padding: '10px',
      textAlign: 'center',
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
      <div style={styles.overlay}>
        <div style={styles.popup}>
          <button type="button" onClick={() => setShowPopup(false)} style={styles.closeButton}>×</button>
          <div style={styles.header}>Mobile Notice</div>
          <div style={styles.content}>
            The maximum size of your current screen is
            {' '}
            <strong>
              {screenSize}
              px
            </strong>
            .
            To use all features of the INS, we
            {' '}
            <strong>recommend accessing it</strong>
            {' '}
            from a computer or other device
            with a minimum screen size of
            {' '}
            <strong>
              {recommendedScreenSize}
              px
            </strong>
            .
          </div>
          <button type="button" onClick={() => setShowPopup(false)} style={styles.button}>I UNDERSTAND</button>
        </div>
      </div>
    )
  );
};

export default ScreenSizePopup;
