import Logo from '../assets/header/Portal_Logo.svg';
import LogoSmall from '../assets/header/Portal_Logo_Small.svg';
import searchbarIcon from '../assets/header/Search_Icon.svg';
import usaFlagSmall from '../assets/header/us_flag_small.svg';

// globalHeaderLogo image 468x100
// globalHeaderImage: image 2200x100
export const headerData = {
  globalHeaderLogo: Logo,
  globalHeaderLogoSmall: LogoSmall,
  globalHeaderLogoLink: '/',
  globalHeaderLogoAltText: 'Portal Logo',
  globalHeaderSearchIcon: searchbarIcon,
  globalHeaderSearchIconAltText: 'search Icon',
  usaFlagSmall,
  usaFlagSmallAltText: 'usaFlagSmall',
};

export const navMobileList = [
  {
    name: 'Home',
    link: '',
    id: 'navbar-link-home',
    className: 'navMobileItem',
  },
  {
    name: 'Other Navbar Item',
    link: '',
    id: 'navbar-dropdown-test-other-navbar-item',
    className: 'navMobileItem clickable',
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
  "Other Navbar Item": [
    {
      name: 'Navbar subitem # 1',
      link: '/subitemlink1',
      text: 'testText for subitem #1',
      id: 'navbar-dropdown-item-navbar-subitem-1',
      className: 'navMobileSubItem',
    },
    {
      name: 'Navbar subitem #2',
      link: '/subitemlink2',
      id: 'navbar-dropdown-item-navbar-subitem-2',
      className: 'navMobileSubItem',
    },
  ],
  About: [
    {
      name: 'Other Resources',
      link: '/or',
      id: 'navbar-dropdown-item-other-resources',
      className: 'navMobileSubTitle',
    },
    {
      name: 'Cancer Genomics Cloud',
      link: '/cgc',
      id: 'navbar-dropdown-item-cancer-genomics-cloud',
      className: 'navMobileSubItem',
    },
    {
      name: 'Database of Genotypes and Phenotypes',
      link: '/dbgap',
      id: 'navbar-dropdown-item-database-of-genotypes-and-phenotypes',
      className: 'navMobileSubItem',
    }],
};
