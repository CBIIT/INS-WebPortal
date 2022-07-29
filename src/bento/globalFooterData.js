import env from '../utils/env';
// footerLogoImage ideal image size 310x80 px

export default {
  footerLogoImage: 'https://raw.githubusercontent.com/cbiit/datacommons-assets/main/bento/images/icons/png/footerlogo.png',
  footerLogoAltText: 'Footer Logo',
  footerLogoHyperlink: 'https://frederick.cancer.gov/',
  footerStaticText: 'NIH … Turning Discovery Into Health®',
  version: env.REACT_APP_FE_VERSION,
  BEversion: env.REACT_APP_BE_VERSION,
  // A maximum of 3 Subsections (link_sections) are allowed
  // A maximum of 4 Subsection Links ('items' under link_sections) are allowed
  // A maximum of 4 Anchor Links (global_footer_links) are allowed
  // Ideal size for icon is 20x20 px
  link_sections: [
    {
      title: 'More Information',
      items: [
        {
          text: 'About INS',
          link: '/bento',
        },
        {
          text: 'Contact INS',
          link: '/resources',
        },
        {
          text: 'INS Data Releases',
          link: 'https://cbiit.github.io/bento-docs/',
        },
        {
          text: 'Resources',
          link: 'https://cbiit.github.io/bento-docs/',
        },
      ],
    },
    {
      title: 'NIH Policies',
      items: [
        {
          text: 'Policies',
          link: 'bento-help@nih.gov',
        },
        {
          text: 'Disclaimer',
          link: 'bento-help@nih.gov',
        },
        {
          text: 'Accessibility',
          link: 'bento-help@nih.gov',
        },
        {
          text: 'FOIA',
          link: 'bento-help@nih.gov',
        },
        {
          text: 'HHS Vulnerability Disclosure',
          link: 'bento-help@nih.gov',
        },
      ],
    },
  ],
  global_footer_links: [
    {
      text: 'U.S. Department of Health and Human Services',
      link: 'https://www.hhs.gov',
    },
    {
      text: 'National Institutes of Health',
      link: 'https://www.nih.gov',
    },
    {
      text: 'National Cancer Institute',
      link: 'https://www.cancer.gov',
    },
    {
      text: 'USA.gov',
      link: 'https://www.usa.gov',
    },
  ],
};
