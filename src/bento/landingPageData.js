import gql from 'graphql-tag';
import backgroundImg from '../assets/landing/backgroundImg.png';
import aboutImg from '../assets/landing/about.png';
import programImg from '../assets/landing/program.png';
import supportImg from '../assets/landing/support.png';
import exploreImg from '../assets/landing/explore.png';
import infographicBubble from '../assets/landing/infographicBubble.png';
import NCICommunity from '../assets/landing/NCICommunity.svg';
import AvailableOutputs from '../assets/landing/AvailableOutputs.svg';
import UpdatedMetrics from '../assets/landing/UpdatedMetrics.svg';
import arrowCommunity from '../assets/landing/arrow-community.svg';
import arrowOutputs from '../assets/landing/arrow-outputs.svg';
import arrowMetrics from '../assets/landing/arrow-metrics.svg';
import heroExploreButtonArrow from '../assets/landing/heroExploreButtonArrow.svg';

// import Test from '../assets/header/CTDC_Logo.svg';

// The ideal image size of landingPageHero 1400x600px
// Tile1 Tile2 Tile3 images 293x349 px
// Tile4 image optimum size 600x 436 px
export const landingPageData = {
  callToActionTitle: 'Delivering accurate accounting of NCI studies',
  callToActionDescription: 'A comprehensive index of programs funded by the National Cancer Institute, devoted to transparency and accuracy of fund allocation and interconnectedness of data output.',
  callToActionButtonText: 'EXPLORE INS DATA',
  callToActionLink: '/explore',
  landingPageHero: {
    alt: 'background',
    img: backgroundImg,
  },
  interactiveImg: {
    alt: 'EXPLORE INS DATA',
    img: infographicBubble,
  },
  NCICommunityImg: {
    alt: 'EXPLORE INS DATA',
    img: NCICommunity,
  },
  AvailableOutputsImg: {
    alt: 'EXPLORE INS DATA',
    img: AvailableOutputs,
  },
  UpdatedMetricsImg: {
    alt: 'EXPLORE INS DATA',
    img: UpdatedMetrics,
  },
  arrowCommunityImg: {
    alt: 'EXPLORE INS DATA',
    img: arrowCommunity,
  },
  arrowOutputsImg: {
    alt: 'EXPLORE INS DATA',
    img: arrowOutputs,
  },
  arrowMetricsImg: {
    alt: 'EXPLORE INS DATA',
    img: arrowMetrics,
  },
  heroExploreButtonArrow: {
    alt: 'button arrow',
    img: heroExploreButtonArrow,
  },
  landingPageStatsBar: [
    {
      statTitle: 'Programs',
      statAPI: 'numberOfPrograms',
    },
    {
      statTitle: 'Projects',
      statAPI: 'numberOfProjects',
    },
    {
      statTitle: 'Publications',
      statAPI: 'numberOfPublications',
    },
    {
      statTitle: 'Datasets',
      statAPI: 'numberOfDatasets',
    },
    {
      statTitle: 'Clinical Trials',
      statAPI: 'numberOfClinicalTrials',
    },
    {
      statTitle: 'Patents',
      statAPI: 'numberOfPatents',
    },
  ],
  tile1: {
    alt: 'about',
    img: aboutImg,
    titleText: 'ABOUT THE INDEX OF NCI STUDIES',
    descriptionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    callToActionText: 'Read More',
    callToActionLink: '/bento', // This links to the "About" static page.
  },
  tile2: {
    alt: 'program',
    img: programImg,
    titleText: 'PROGRAMS',
    descriptionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    callToActionText: 'Visit programs listing',
    callToActionLink: '/programs', // This links to the Programs Listing Page.
  },
  tile3: {
    alt: 'support',
    img: supportImg,
    titleText: 'INS SUPPORT',
    descriptionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    callToActionText: 'Contact INS',
    callToActionLink: '/resources', // Link to the "Resources" Static Page
  },
  tile4: {
    alt: 'explore',
    img: exploreImg,
    titleText: 'INS DATA OUTLETS',
    descriptionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    callToActionText: 'Learn more',
    callToActionLink: '/explore', // This links to the cases dashboard.
  },
};

// --------------- GraphQL query - Retrieve Landing page data --------------
export const GET_LANDING_PAGE_DATA_QUERY = gql`{
  numberOfPrograms
  numberOfProjects
  numberOfPublications
  numberOfDatasets
  numberOfClinicalTrials
  numberOfPatents
}
  `;
