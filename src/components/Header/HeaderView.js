import React from 'react';
import { withRouter } from 'react-router-dom';
import { Header } from '../../bento-components';
import headerData from '../../bento/globalHeaderData';
import SearchAUtoFill from '../Search/searchAutoFillComponent';

const styles = {
  nihLogoImg: {
    minHeight: '100px',
    cursor: 'pointer',
    marginLeft: '15px',
  },
};

const INSHeader = (props) => {
  const { location } = props;
  return location.pathname.match('/search') ? (
    <Header
      logo={headerData.globalHeaderLogo}
      easter={headerData.globalHeaderImage}
      alt={headerData.globalHeaderLogoAltText}
      homeLink={headerData.globalHeaderLogoLink}
      customStyle={styles}
    />
  ) : (
    <Header
      logo={headerData.globalHeaderLogo}
      easter={headerData.globalHeaderImage}
      alt={headerData.globalHeaderLogoAltText}
      homeLink={headerData.globalHeaderLogoLink}
      customStyle={styles}
      SearchComponent={SearchAUtoFill}
    />
  );
};

export default withRouter(INSHeader);
