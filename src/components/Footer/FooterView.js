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
          Software Version: v1.3.0
          <br />
          <br />
          Site Data Update (Projects, Grants, Publications, Datasets, Clinical Trials): 04/04/2023
          <br />
          <br />
          Site Data Update (Patents): 03/02/2023
        </div>
      </div>
    </>
  );
};

Footer.defaultProps = {
  background: '#310d32',
};

export default INSFooter;
