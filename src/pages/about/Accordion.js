import React, { useState, useEffect } from 'react';
import upIcon from './Up.svg';
import downIcon from './Down.svg';

const Accordion = ({ title, children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const nowMobile = window.innerWidth < 480;
      setIsMobile(nowMobile);
      if (!nowMobile) {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) {
    return (
      <>
        <h2 className="aboutContentHeader">{title}</h2>
        {children}
      </>
    );
  }

  return (
    <div className="accordionSection">
      <button type="button" className="accordionButton" onClick={() => setIsOpen((prev) => !prev)}>
        <span>{title}</span>
        <img
          src={isOpen ? downIcon : upIcon}
          alt={isOpen ? 'Collapse section' : 'Expand section'}
          className="accordionIcon"
        />
      </button>
      {isOpen && <div className="accordionContent">{children}</div>}
    </div>
  );
};

export default Accordion;
