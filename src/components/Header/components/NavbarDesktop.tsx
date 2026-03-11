import React, { useEffect, useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

import { navMobileList, navbarSublists } from '../../../config/globalHeaderData.tsx';

const Nav = styled.div`
    top: 0;
    left: 0;
    width: 100%;
    background: #ffffff;
    box-shadow: -0.1px 6px 9px -6px rgba(0, 0, 0, 0.5);
    z-index: 1100;
    position: relative;

    .dropdownContainer {
      // outline: none;
      // visibility: hidden;
      // opacity: 0;
      margin: 0 auto;
      position: relative;
      width: 1400px;
    }
    .invisible {
      visibility: hidden;
    }
 `;

const NavContainer = styled.div`
    margin: 0 auto;
    max-width: 1400px;
    text-align: left;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: end;
`;

const UlContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding-top: 17px;
  padding-left: 11px;
`;

const LiSection = styled.li`
  display: inline-block;
  position: relative;
  line-height: 50px;
  letter-spacing: 1px;
  text-align: center;
  transition:all 0.3s ease-in-out;

  a {
    color: #585C65;
    text-decoration: none;
  }

  .navTitle {
    display: block;
    color: #585C65;
    font-family: poppins;
    font-size: 17px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: normal;
    text-decoration: none;
    margin: 0 45px 0 5px;
    padding: 0 15px;
    user-select:none;
    border-top: 4px solid transparent;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
  }

  .navTitle:hover {
    cursor: pointer;
  }

  .navText {
    border-bottom: 4px solid transparent;
  }

  .navText:hover {
    cursor: pointer;
    color: #3A75BD;
    border-bottom: 4px solid #3A75BD;

    ::after {
      content: "";
      display: inline-block;
      width: 6px;
      height: 6px;
      border-bottom: 1px solid #298085;
      border-left: 1px solid #298085;
      margin: 0 0 4px 8px;
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }
  }

  .navText::after {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-bottom: 1px solid #585C65;
    border-left: 1px solid #585C65;
    margin: 0 0 4px 8px;
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  .clicked {
    color: #FFFFFF;
    background: #1F4671;
  }

  .clicked::after {
    border-top: 1px solid #FFFFFF;
    border-right: 1px solid #FFFFFF;
    border-bottom: 0;
    border-left: 0;
    margin: 0 0 0 8px
  }

  .clicked:hover {
    border-bottom: 4px solid #1F4671;
    color: #FFFFFF;

    ::after {
      content: "";
      display: inline-block;
      width: 6px;
      height: 6px;
      border-top: 1px solid #FFFFFF;
      border-right: 1px solid #FFFFFF;
      border-bottom: 0;
      border-left: 0;
      margin: 0 0 0 8px;
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }
  }

  .directLink::after {
    display: none;
  }

  .directLink:hover {
    ::after {
      display: none;
    }
  }
  .shouldBeUnderlined {
    border-bottom: 4px solid #3A75BD;
  }
  .navTitleClicked {
    display: block;
    color: #FFFFFF;
    font-family: poppins;
    font-size: 17px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: normal;
    text-decoration: none;
    margin: 0 45px 0 5px;
    padding: 0 15px;
    user-select:none;
    background: #1F4671;
    border-top: 4px solid #5786FF;
    border-left: 4px solid #5786FF;
    border-right: 4px solid #5786FF;
  }
`;

const Dropdown = styled.div`
    top: 60.5px;
    left: 0;
    width: 100%;
    background: #1F4671;
    z-index: 1100;
    position: absolute;
    // visibility: hidden;
    // outline: none;
    // opacity: 0;
`;

const DropdownContainer = styled.div`
    margin: 0 auto;
    text-align: left;
    position: relative;
    max-width: 1400px;

    .dropdownList {
      background: #1F4671;
      display: grid;
      grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
      padding: 32px 32px 0 32px;
    }

    .dropdownItem {
      padding: 0 10px 52px 10px;
      text-align: left;
      font-family: 'Poppins';
      font-weight: 600;
      font-style: normal;
      font-size: 20px;
      line-height: 110%;
      color: #FFFFFF;
      text-decoration: none;
  }

  .dropdownItem:hover {
    text-decoration: underline;
  }

  .dropdownItemText {
    margin-top: 5px;
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-size: 16.16px;
    line-height: 22px;
  }
`;

const StyledLoginLink = styled(Link)`
  color: #007BBD;
  text-align: right;
  font-size: 14px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.42px;
  text-decoration: none;
  text-transform: uppercase;
  padding: 10px 0 10px 0;
  margin-bottom: 4.5px;
  margin-right: 32px;
`;

const useOutsideAlerter = (ref) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target || (event.target.getAttribute("class") !== "dropdownList" && ref.current && !ref.current.contains(event.target))) {
        const toggle = document.getElementsByClassName("navText clicked");
        if (toggle[0] && event.target.getAttribute("class") !== "navText clicked" && event.target.getAttribute("class") !== "navText clicked") {
          const temp: HTMLElement = toggle[0] as HTMLElement;
          temp.click();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

const NavBar = () => {
  const [clickedTitle, setClickedTitle] = useState("");
  const dropdownSelection = useRef(null);
  const clickableObject = navMobileList.filter((item) => item.className === 'navMobileItem clickable');
  const clickableTitle = clickableObject.map((item) => item.name);
  useOutsideAlerter(dropdownSelection);

  const handleMenuClick = (e) => {
    if (e.target.innerText === clickedTitle || !clickableTitle.includes(e.target.innerText)) {
      setClickedTitle("");
    } else {
      setClickedTitle(e.target.innerText);
    }
  };

  const onKeyPressHandler = (e) => {
    if (e.key === "Enter") {
      handleMenuClick(e);
    }
  };
  type NavSubLinkData = {
    name: string;
    link: string;
    className: string;
  };

  function shouldBeUnderlined(item) {
    const linkName = item.name;
    const correctPath = window.location.href.slice(window.location.href.lastIndexOf(window.location.host) + window.location.host.length);
    // Take out the prefix of the hash routing ie '/#/programs' -> '/programs'
    const hashIndex = correctPath.indexOf('#');
    const trimmedPath = hashIndex !== -1 ? correctPath.substring(hashIndex + 1) : correctPath;

    // Check if current path matches any sublist paths for this item
    if (navbarSublists[linkName] !== undefined) {
      const linkNames = Object.values(navbarSublists[linkName]).map((e: NavSubLinkData) => e.link);
      // Check for both exact match and prefix match (for detail pages like /program/xyz)
      const hasMatch = linkNames.some(link =>
        trimmedPath === link || trimmedPath.startsWith(link + '/')
      );
      if (hasMatch) {
        return true;
      }
    }

    // For direct links without sublists, check exact match
    if (item.className === "navMobileItem") {
      return trimmedPath === item.link;
    }
    return false;
  }

  useEffect(() => {
    setClickedTitle("");
  }, []);

  return (
    <Nav>
      <NavContainer>
        <UlContainer>
          {
            navMobileList.map((navMobileItem, idx) => {
              const navkey = `nav_${idx}`;
              const isExternal = navMobileItem.externalLink || navMobileItem.link.startsWith('http');
              return (
                navMobileItem.className === 'navMobileItem'
                  ? (
                    <LiSection key={navkey}>
                      <div className="navTitle directLink">
                        {isExternal ? (
                          <a href={navMobileItem.link} target="_blank" rel="noopener noreferrer">
                            <div
                              id={navMobileItem.id}
                              onKeyDown={onKeyPressHandler}
                              role="button"
                              tabIndex={0}
                              className={`navText directLink ${shouldBeUnderlined(navMobileItem) ? "shouldBeUnderlined" : ""}`}
                              onClick={handleMenuClick}
                            >
                              {navMobileItem.name}
                            </div>
                          </a>
                        ) : (
                          <NavLink to={navMobileItem.link}>
                            <div
                              id={navMobileItem.id}
                              onKeyDown={onKeyPressHandler}
                              role="button"
                              tabIndex={0}
                              className={`navText directLink ${shouldBeUnderlined(navMobileItem) ? "shouldBeUnderlined" : ""}`}
                              onClick={handleMenuClick}
                            >
                              {navMobileItem.name}
                            </div>
                          </NavLink>
                        )}
                      </div>
                    </LiSection>
                  )
                  : (
                    <LiSection key={navkey}>
                      <div className={clickedTitle === navMobileItem.name ? 'navTitleClicked' : 'navTitle'}>
                        <div
                          id={navMobileItem.id}
                          onKeyDown={onKeyPressHandler}
                          role="button"
                          tabIndex={0}
                          className={`${clickedTitle === navMobileItem.name ? 'navText clicked' : 'navText'} ${shouldBeUnderlined(navMobileItem) ? "shouldBeUnderlined" : ""}`}
                          onClick={handleMenuClick}
                        >
                          {navMobileItem.name}
                        </div>
                      </div>
                    </LiSection>
                  )
              );
            })
          }
        </UlContainer>
      </NavContainer>
      <Dropdown ref={dropdownSelection} className={clickedTitle === ''  ? "invisible" : ""}>
        <DropdownContainer>
          <div className="dropdownList">
            {
              clickedTitle !== "" ? navbarSublists[clickedTitle].map((dropItem, idx) => {
                const dropkey = `drop_${idx}`;
                const isPdf = dropItem.link && dropItem.link.endsWith('.pdf');
                const isExternal = dropItem.link && (dropItem.link.startsWith('http') || isPdf);

                return (
                  dropItem.link && (
                    isExternal ? (
                      <a
                        id={dropItem.id}
                        href={dropItem.link}
                        className="dropdownItem"
                        key={dropkey}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setClickedTitle("")}
                      >
                        {dropItem.name}
                        <div className="dropdownItemText">{dropItem.text}</div>
                      </a>
                    ) : (
                      <Link
                        id={dropItem.id}
                        to={dropItem.link}
                        className="dropdownItem"
                        key={dropkey}
                        onClick={() => setClickedTitle("")}
                      >
                        {dropItem.name}
                        <div className="dropdownItemText">{dropItem.text}</div>
                      </Link>
                    )
                  )
                );
              })
                : null
            }
          </div>
        </DropdownContainer>
      </Dropdown>
    </Nav>
  );
};

export default NavBar;
