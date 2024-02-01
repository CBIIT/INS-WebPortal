/* eslint-disable max-len */
import React from 'react';
import './GovtBannerStyle.css';

const GovtBannerView = () => (
  <>
    <div className="nci-shutdown-banner__container">
      <section className="nci-shutdown-banner" aria-label="Government Funding Lapse">
        <div className="nci-shutdown-banner__body">
          <h2>Government Funding Lapse</h2>
          <p style={{ margin: 0 }}>
            Because of a lapse in government funding, the information on this website may not be up to date, transactions submitted via the website may not be processed, and the agency may not be able to respond to inquiries until appropriations are enacted. The NIH Clinical Center (the research hospital of NIH) is open. For more details about its operating status, please visit
            {' '}
            <a href="https://cc.nih.gov/">cc.nih.gov</a>
            . Updates regarding government operating status and resumption of normal operations can be found at
            {' '}
            <a href="https://opm.gov/">OPM.gov</a>
            .
          </p>
        </div>
      </section>
    </div>
  </>
);

export default GovtBannerView;
