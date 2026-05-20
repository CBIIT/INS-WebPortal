import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import Logo from './components/LogoDesktop.tsx';
import SearchBar from './components/SearchBarDesktop.tsx';
import NavBar from './components/NavbarDesktop.tsx';

const HeaderBanner = styled.div`
  width: 100%;
`;

const HeaderContainer = styled.div`
    margin: 0 auto;
    padding-left: 32px;
    max-width: 1400px;
    display: flex;

    .headerSearchBarArea {
        padding: 5px 24px 0 0;
        margin-top: 42px;
    }

    .headerLowerContainer {
        display: flex;
        margin-left: auto;
    }
`;

const Header = () => {
  const path = useLocation().pathname;

  return (
    <HeaderBanner role="banner">
      <HeaderContainer>
        <Logo />
        <div className="headerLowerContainer">
          {!path.includes('/globalsearch') && <div className="headerSearchBarArea"><SearchBar /></div>}
        </div>
      </HeaderContainer>
      <div className="navbarContainer"><NavBar /></div>
    </HeaderBanner>
  );
};

export default Header;
