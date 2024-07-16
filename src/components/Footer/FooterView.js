import React, { useState } from 'react';
import { Footer } from '@bento-core/footer';
import FooterData from '../../bento/globalFooterData';
import './footer.css';

// import { Footer } from '../../bento-components';

const styles = {
  horizontalLine: 'horizontalLineStyles',
  footorVersiontext: 'customizedFootorVersiontext',
};

const INSFooter = () => {
  const [footerUpdatedData, setFooterUpdatedData] = useState(FooterData);

  return (
    <>
      <Footer classes={styles} data={footerUpdatedData} />
    </>
  );
};

Footer.defaultProps = {
  background: '#310d32',
};

export default INSFooter;
