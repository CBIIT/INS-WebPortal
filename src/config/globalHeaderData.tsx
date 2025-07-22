import Logo from '../assets/header/NCI_INS_Logo.svg';
import LogoSmall from '../assets/header/Portal_Logo_Small.svg';
import searchbarIcon from '../assets/header/Search_Icon.svg';
import usaFlagSmall from '../assets/header/us_flag_small.svg';

// globalHeaderLogo image 468x100
// globalHeaderImage: image 2200x100
export const headerData = {
  globalHeaderLogo: Logo,
  globalHeaderLogoSmall: Logo,
  globalHeaderLogoLink: '#/home',
  globalHeaderLogoAltText: 'INS Logo',
  globalHeaderSearchIcon: searchbarIcon,
  globalHeaderSearchIconAltText: 'search Icon',
  usaFlagSmall,
  usaFlagSmallAltText: 'usaFlagSmall',
};

export const navMobileList = [
  {
    name: 'Home',
    link: 'home',
    id: 'navbar-link-home',
    className: 'navMobileItem',
  },
  {
    name: 'Programs',
    link: 'programs',
    id: 'navbar-link-programs',
    className: 'navMobileItem',
  },
  {
    name: 'Datasets',
    link: 'datasets',
    id: 'navbar-link-datasets',
    className: 'navMobileItem',
  },
  {
    name: 'About',
    link: '',
    id: 'navbar-dropdown-about',
    className: 'navMobileItem clickable',
  },
];

export const navbarSublists = {
  // Example of how to do a navMobileSubTitle and subtext
  // Home: [
  //   {
  //     name: 'Explore ##',
  //     link: '',
  //     text: 'testText',
  //     className: 'navMobileSubTitle',
  //   },
  // ],
  About: [
    {
      name: 'About INS',
      link: 'about',
      id: 'navbar-dropdown-item-about-ins',
      className: 'navMobileSubTitle',
    },
    {
      name: 'Glossary (PDF)',
      link: '/INS_glossary_v3.1.0_V2.pdf',
      id: 'navbar-dropdown-item-glossary',
      className: 'navMobileSubItem',
    },
    {
      name: 'Release Notes (PDF)',
      link: '/Release_v3.1.0.pdf',
      id: 'navbar-dropdown-item-release-notes',
      className: 'navMobileSubItem',
    },
  ],
};
