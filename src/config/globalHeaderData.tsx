import Logo from '../assets/header/Logo.svg';
import searchbarIcon from '../assets/header/Search_Icon.svg';
import usaFlagSmall from '../assets/header/us_flag_small.svg';

export type NavItemClassName =
  | 'navMobileItem'
  | 'navMobileItem clickable'
  | 'navMobileSubItem'
  | 'navMobileSubTitle';

export type NavItem = {
  name: string;
  link: string;
  id: string;
  className: NavItemClassName;
  externalLink?: boolean;
};

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

export const navMobileList: NavItem[] = [
  {
    name: 'Home',
    link: '/home',
    id: 'navbar-link-home',
    className: 'navMobileItem',
  },
  {
    name: 'Programs',
    link: '/programs',
    id: 'navbar-link-programs',
    className: 'navMobileItem',
  },
  {
    name: 'Datasets',
    link: '/datasets',
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

export const navbarSublists: { [key: string]: NavItem[] } = {
  // Mapping for navbar items to highlight when on related pages
  Home: [
    {
      name: 'Home',
      link: '/',
      id: 'navbar-sublist-home',
      className: 'navMobileSubTitle',
    },
    {
      name: 'Home Alt',
      link: '/home',
      id: 'navbar-sublist-home-alt',
      className: 'navMobileSubTitle',
    },
  ],
  Programs: [
    {
      name: 'Programs',
      link: '/programs',
      id: 'navbar-sublist-programs',
      className: 'navMobileSubTitle',
    },
    {
      name: 'Program Detail',
      link: '/program',
      id: 'navbar-sublist-program-detail',
      className: 'navMobileSubTitle',
    },
    {
      name: 'Project Detail',
      link: '/project',
      id: 'navbar-sublist-project-detail',
      className: 'navMobileSubTitle',
    },
  ],
  Datasets: [
    {
      name: 'Datasets',
      link: '/datasets',
      id: 'navbar-sublist-datasets',
      className: 'navMobileSubTitle',
    },
    {
      name: 'Dataset Detail',
      link: '/dataset',
      id: 'navbar-sublist-dataset-detail',
      className: 'navMobileSubTitle',
    },
  ],
  About: [
    {
      name: 'About INS',
      link: '/about',
      id: 'navbar-dropdown-item-about-ins',
      className: 'navMobileSubItem',
    },
    {
      name: 'Glossary (PDF)',
      link: '/INS_glossary_v3.1.0_V2.pdf',
      id: 'navbar-dropdown-item-glossary',
      className: 'navMobileSubItem',
      externalLink: true,
    },
    {
      name: 'Release Notes (PDF)',
      link: '/Release_v3.2.0.pdf',
      id: 'navbar-dropdown-item-release-notes',
      className: 'navMobileSubItem',
      externalLink: true,
    },
  ],
};
