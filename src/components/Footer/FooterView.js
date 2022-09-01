import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core';
import { Footer } from 'bento-components';
import FooterData from '../../bento/globalFooterData';
import env from '../../utils/env';

const FILE_SERVICE_API = env.REACT_APP_FILE_SERVICE_API;

const styles = {
  horizontalLine: {
    width: '100%',
    margin: '32px auto 16px auto',
    borderTop: '1px solid #592A59',
  },
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

  return <><Footer classes={styles} data={footerUpdatedData} /></>;
};

Footer.defaultProps = {
  background: '#310d32',
};

export default INSFooter;
