import env from '../utils/env';
// footerLogoImage ideal image size 310x80 px

export default {
  footerLogoText: 'National Cancer Institute',
  footerLogoSubText: 'at the National Institutes of Health',
  footerLogoHyperlink: 'https://cancer.gov/',
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
          link: '/about',
        },
        {
          text: 'Contact INS',
          link: 'nciofficeofdatasharing@mail.nih.gov?Subject=Index%20of%20NCI%20Studies%20feedback',
        },
      ],
    },
    {
      title: 'NIH Policies',
      items: [
        {
          text: 'Policies',
          link: 'https://www.cancer.gov/policies',
        },
        {
          text: 'Disclaimer',
          link: 'https://www.cancer.gov/policies/disclaimer',
        },
        {
          text: 'Accessibility',
          link: 'https://www.cancer.gov/policies/accessibility',
        },
        {
          text: 'FOIA',
          link: 'https://www.cancer.gov/policies/foia',
        },
        {
          text: 'HHS Vulnerability Disclosure',
          link: 'https://www.hhs.gov/vulnerability-disclosure-policy/index.html',
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
