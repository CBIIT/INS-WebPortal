import React, { useState, useEffect } from 'react';
import AboutView from './aboutView';

const About = ({ match }) => {
  const [data, setData] = useState([]);

  return (
    <AboutView data={data} />
  );
};
export default About;
