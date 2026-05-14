import externalLinkIconBlueSrc from '../assets/icons/externalLinkIconBlue.svg';

const descMaxLength = 750;

const externalLinkIconBlue = {
  src: externalLinkIconBlueSrc,
  alt: 'External link icon blue',
};

const resourceCategoriesFields = [
  {
    label: 'Tool Type',
    datafield: 'resource_tool_type',
    dynamic: true,
    isArray: true,
    tooltip: 'The type of platform, methodology, framework, or other software designed for the use of and interpretation of cancer research',
  },
  {
    label: 'Tool Subtype',
    datafield: 'resource_tool_subtype',
    dynamic: true,
    isArray: true,
    tooltip: 'A more specific type of tool or methodology within each resource tool type',
  },
  {
    label: 'Research Area',
    datafield: 'resource_research_area',
    dynamic: true,
    isArray: true,
    tooltip: 'The specific field of study within cancer research',
  },
  {
    label: 'Research Type',
    datafield: 'resource_research_type',
    dynamic: true,
    isArray: true,
    tooltip: 'Research classification which corresponds to the research purpose or the part of the research process',
  },
];

const resourceInformationFields = [
  {
    label: 'Access Control',
    datafield: 'resource_access',
    dynamic: true,
    isArray: false,
    tooltip: 'How accessible the information is, whether it is freely accessible or requires conditions before accessing the information',
  },
  {
    label: 'NCI Division/Office/Center',
    datafield: 'resource_doc',
    dynamic: true,
    isArray: true,
    tooltip: 'Each of NCI\'s divisions, offices, and centers (DOC) who work together to build and maintain comprehensive cancer research',
  },
  {
    label: 'Contact Name',
    datafield: 'resource_poc_name',
    dynamic: true,
    isArray: true,
    tooltip: 'The resource\'s point of contact name',
  },
  {
    label: 'Contact Email',
    datafield: 'resource_poc_email',
    dynamic: true,
    isArray: true,
    tooltip: 'The resource\'s point of contact email',
  },
];

export {
  externalLinkIconBlue,
  descMaxLength,
  resourceCategoriesFields,
  resourceInformationFields,
};
