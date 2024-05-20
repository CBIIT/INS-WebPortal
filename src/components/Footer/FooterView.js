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
      <div>
        <div className="beVersion">
          <p>Software Version: v2.1.0</p>
          <p>
            Data Version:
            &nbsp;
            <a rel="noreferrer" href="https://github.com/CBIIT/INS-Data" target="_blank">v1.1.0</a>
          </p>
        </div>
      </div>
    </>
  );
};

Footer.defaultProps = {
  background: '#310d32',
};

export default INSFooter;
