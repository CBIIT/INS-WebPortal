import React from 'react';
import styled from 'styled-components';
import { headerData } from '../../config/globalHeaderData.tsx';

const BannerArea = styled.div`
    flex-direction:row;
    width: 100%;
    height: 46px;
    background: #F0F0F0;
`;

const BannerContainer = styled.div`
    display:flex;
    align-items:center;
    max-width: 1400px;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 25px;

    img {
      margin-right: 15px;
      height: 11px;
      width: 16px;
    }

    .text {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        font-size: 12.16px;
        line-height: 16px;
        letter-spacing: normal;
        width: fit-content;
        height: 16px;
        color: #1b1b1b;
    }

    @media (max-width: 1023px) {
        padding-left: 1rem;
    }
`;

const USABanner = () => (
  <BannerArea>
    <BannerContainer>
      <img src={headerData.usaFlagSmall} alt={headerData.usaFlagSmallAltText} />
      <div className="text">
        An official website of the United States government
      </div>
    </BannerContainer>
  </BannerArea>
);

export default USABanner;
