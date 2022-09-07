import React, { useEffect, useState } from 'react';
import { Footer } from 'bento-components';
import FooterData from '../../bento/globalFooterData';
import env from '../../utils/env';
import './footer.css';

const FILE_SERVICE_API = env.REACT_APP_FILE_SERVICE_API;

const styles = {
  horizontalLine: 'horizontalLineStyles',
};

const INSFooter = () => {
  const [footerUpdatedData, setFooterUpdatedData] = useState(FooterData);

  useEffect(() => {
    const getSystems = async () => {
      const response = await fetch(
        `${FILE_SERVICE_API}version`,
      ).then((resp) => (resp))
        .catch(() => ({ version: '' }));
      const data = response.json();
      setFooterUpdatedData({ ...FooterData, ...{ FileServiceVersion: data.version || '' } });
    };
    getSystems();
  }, [FooterData]);

  return (
    <>
      <Footer classes={styles} data={footerUpdatedData} />
      <span className="beVersion">
        Site Data Update (Projects, Publications etc.): DD/MM/YYYY
        <br />
        <br />
        Site Data Update (Datasets): DD/MM/YYYY
      </span>
    </>
  );
};

Footer.defaultProps = {
  background: '#310d32',
};

export default INSFooter;
