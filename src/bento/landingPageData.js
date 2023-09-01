import gql from 'graphql-tag';
import backgroundImg from '../assets/landing/backgroundImg.png';
import aboutImg from '../assets/landing/about.png';
import programImg from '../assets/landing/program.png';
import supportImg from '../assets/landing/support.png';
import exploreImg from '../assets/landing/explore.png';
import redBubble from '../assets/landing/red_button.png';
import yellowBubble from '../assets/landing/yellow_button.png';
import purpleBubble from '../assets/landing/purple-button.png';
import trek from '../assets/landing/trek.png';
import NCICommunity from '../assets/landing/NCICommunity.svg';
import AvailableOutputs from '../assets/landing/AvailableOutputs.svg';
import UpdatedMetrics from '../assets/landing/UpdatedMetrics.svg';
import arrowCommunity from '../assets/landing/arrow-community.svg';
import arrowOutputs from '../assets/landing/arrow-outputs.svg';
import arrowMetrics from '../assets/landing/arrow-metrics.svg';
import heroExploreButtonArrow from '../assets/landing/heroExploreButtonArrow.svg';

// The ideal image size of landingPageHero 1400x600px
// Tile1 Tile2 Tile3 images 293x349 px
// Tile4 image optimum size 600x 436 px
export const landingPageData = {
  callToActionTitle: 'Gathering outputs from NCI-supported grants in one place',
  callToActionDescription: 'A comprehensive index of programs funded by the National Cancer Institute, devoted to transparency and accuracy of fund allocation and interconnectedness of data output. This pilot phase of the site is temporarily limited to data generated through extramural grants from two NCI programs.',
  callToActionButtonText: 'EXPLORE INS DATA',
  callToActionLink: '/explore',
  nciCommunityTitle: 'NCI Community',
  nciCommunityDescription: 'INS finds NCI programs and projects',
  nciCommunityLink: '/explore',
  availableOutputsTitle: 'Available Outputs',
  availableOutputsDescription: 'INS finds publicly shared outputs',
  availableOutputsLink: '/explore',
  updatedMetricsTitle: 'Updated Metrics',
  updatedMetricsDescription: 'View metrics on shared data',
  updatedMetricsLink: '/explore',
  landingPageHero: {
    alt: 'background',
    img: backgroundImg,
  },
  interactiveImg: {
    alt: 'EXPLORE INS DATA',
    img: trek,
  },
  NCICommunityBubble: {
    alt: 'EXPLORE INS DATA',
    img: redBubble,
  },
  AvailableOutputsBubble: {
    alt: 'EXPLORE INS DATA',
    img: yellowBubble,
  },
  UpdatedMetricsBubble: {
    alt: 'EXPLORE INS DATA',
    img: purpleBubble,
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
      statAPI: 'numberOfCoreProjects',
    },
    {
      statTitle: 'Grants',
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
    descriptionText: 'The goal of the Index of NCI Studies (INS) is to enable access to information about the large amount of data generated by NCI-supported studies so that NCI leadership, cancer researchers, and the public can rapidly assess the state of science at a single location.',
    callToActionText: 'Read More',
    callToActionLink: '/about', // This links to the "About" static page.
  },
  tile2: {
    alt: 'program',
    img: programImg,
    titleText: 'PROGRAMS',
    descriptionText: 'Provides a list of programs currently included in the site.',
    callToActionText: 'Visit programs listing',
    callToActionLink: '/programs', // This links to the Programs Listing Page.
  },
  tile3: {
    alt: 'support',
    img: supportImg,
    titleText: 'INS SUPPORT',
    descriptionText: 'For questions or feedback, please contact INS support.',
    callToActionText: 'Contact INS',
  },
  tile4: {
    alt: 'explore',
    img: exploreImg,
    titleText: 'INS DATA OUTLETS',
    descriptionText: 'INS starts its data gathering process with an NCI-funded program of interest such as the Cancer Moonshot program or the Childhood Cancer Data Initiative (CCDI).',
    callToActionText: 'Learn more',
    callToActionLink: '/explore', // This links to the cases dashboard.
  },
};

// --------------- GraphQL query - Retrieve Landing page data --------------
export const GET_LANDING_PAGE_DATA_QUERY = gql`{
  numberOfPrograms
  numberOfCoreProjects
  numberOfProjects
  numberOfPublications
  numberOfDatasets
  numberOfClinicalTrials
  numberOfPatents
}
  `;
