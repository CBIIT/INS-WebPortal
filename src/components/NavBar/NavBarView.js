import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.div`
    position: relative;
    width: 100%;
    height: 40px;
    background-color: rgb(62, 60, 63);
    zIndex: 999
`;

const NavContainer = styled.div`
    margin: 0 auto;
    width: 100%;
    text-align: center;
    position: relative;
`;

const UlContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const LiSection = styled.li`
  display: inline-block;
  position: relative;
  line-height: 40px;
  letter-spacing: 1px;
  text-align: center;
  color: #ffffff;
  font-size: 17px;
  font-weight: 600;
  font-family: Nunito;
  text-decoration: none;
  cursor: pointer;
  transition:all 0.3s ease-in-out;

  a{
    display: block;
    color: #ffffff;
    text-decoration: none;
    padding: 0 30px;
  }

  &:hover {
    color: #ffffff;
    background-color: #241F24;
  }

  .menuLabel {
    display: block;
    color: #ffffff;
    text-decoration: none;
    padding: 0 30px;
  }

  &:hover .dropdown-block {
    display: block;
  }
`;

const MenuDropDown = styled.div`
  width: 233px;
  padding: 0;
  background-color: unset;
  border: 0;
  position: absolute;
  display: none;
  position: absolute;
  z-index: 999;
  padding: 0;
  left: 0;
  top: 28px;

  &::before {
    content: '';
    clip-path: polygon(50% 0, 100% 100%, 0 100%);
    height: 13px;
    width: 15px;
    background-color: #ffffff;
    left: 50px;
    position: absolute;
  }

  .dropdown-list {
    list-style: none;
    background-color: #ffffff;
    margin-top: 12px;
    padding: 10px 20px;
    box-shadow: 0px 3px 6px 3px rgb(73 73 73 / 39%);
  }

  .dropdown-list li {
    text-align: left;
  }

  .dropdown-list li a {
    overflow-wrap: normal;
    text-decoration: none;
    color: #413E41;
    font-size: 16px;
    line-height: 20px;
    font-weight: 300;
    font-family: Nunito;
    display: block;
    padding: 10px 0;

    &:hover {
      color: black;
      font-weight: 800;
    }
  }
`;

const activeStyle = {
  color: '#ffffff',
  backgroundColor: '#241F24',
};

const subMenuActiveStyle = {
  color: 'black',
  fontWeight: '800',
};

const NavBar = () => {
  const path = useLocation().pathname;
  return (
    <Nav>
      <NavContainer>
        <UlContainer>
          <LiSection style={path === '/home' ? activeStyle : null}><NavLink to="/home">Home</NavLink></LiSection>
          <LiSection style={path === '/explore' ? activeStyle : null}><NavLink to="/explore">Explore</NavLink></LiSection>
          <LiSection style={path === '/about' ? activeStyle : null}>
            <span className="menuLabel">
              About
            </span>
            <MenuDropDown className="dropdown-block">
              <ul className="dropdown-list">
                <li><NavLink to="/about" style={path === '/about' ? subMenuActiveStyle : null}>About INS</NavLink></li>
                <li><a href="/INS_glossary_v2.0.0.pdf" target="_blank" rel="noreferrer">Glossary (PDF)</a></li>
                <li><a href="/Release_v2.1.0.pdf" target="_blank" rel="noreferrer">Release Notes (PDF)</a></li>
              </ul>
            </MenuDropDown>
          </LiSection>
        </UlContainer>
      </NavContainer>
    </Nav>
  );
};

export default NavBar;
