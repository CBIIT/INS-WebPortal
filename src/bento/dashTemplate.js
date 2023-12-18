import { sortType, InputTypes } from '@bento-core/facet-filter';

const PROJECTS = 'Projects';
const GROUP = 'group';

// --------------- Facet resetIcon link configuration --------------
// Ideal size for resetIcon is 16x16 px
export const resetIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
  alt: 'Reset icon',
  size: '12 px',
};

// --------------- Dashboard Sidebar Sections styling --------------
export const facetSectionVariables = {
  Projects: {
    color: '#10A075',
    backgroundColor: '#C0E9D7',
    checkBoxColorsOne: '#E8F7DC',
    checkBoxColorsTwo: '#F5FDEE',
    height: '5px',
    isExpanded: true,
  },
};

export const facetsConfig = [{
  section: PROJECTS,
  label: 'Program',
  field: GROUP,
  apiPath: 'projectCountByProgram',
  apiForFiltering: 'filterProjectCountByProgram',
  datafield: 'programs',
  type: InputTypes.CHECKBOX,
  sort_type: sortType.ALPHABET,
  show: true,
  tooltips: {
    CCDI: 'Childhood Cancer Data Initiative',
    Moonshot: 'Cancer Moonshot',
  },
},
{
  section: PROJECTS,
  label: 'Division/Office/Center',
  field: GROUP,
  apiPath: 'projectCountByDOC',
  apiForFiltering: 'filterProjectCountByDOC',
  datafield: 'docs',
  type: InputTypes.CHECKBOX,
  sort_type: sortType.ALPHABET,
  show: true,
  tooltips: {
    CCG: 'Center for Cancer Genomics',
    CCT: 'Center for Cancer Training',
    CRCHD: 'Center to Reduce Cancer Health Disparities',
    CSSI: 'Center for Strategic Scientific Initiatives',
    DCB: 'Division of Cancer Biology',
    DCCPS: 'Division of Cancer Control and Population Sciences',
    DCP: 'Division of Cancer Prevention',
    DCTD: 'Division of Cancer Treatment and Diagnosis',
    OD: 'Office of the Director',
    SBIR: 'Small Business Innovation Research',
    OCC: 'Office of Cancer Centers',
  },
},
{
  section: PROJECTS,
  label: 'Fiscal Year',
  field: GROUP,
  apiPath: 'projectCountByFiscalYear',
  apiForFiltering: 'filterProjectCountByFiscalYear',
  datafield: 'fiscal_years',
  type: InputTypes.CHECKBOX,
  sort_type: sortType.ALPHABET,
  show: true,
},
{
  section: PROJECTS,
  label: 'Award Amount',
  field: GROUP,
  apiPath: 'projectCountByAwardAmount',
  apiForFiltering: 'filterProjectCountByAwardAmount',
  datafield: 'award_amounts',
  type: InputTypes.CHECKBOX,
  sort_type: sortType.ALPHABET,
  show: true,
},
];

// --------------- Dashboard Widgets configuration --------------
// Sunburst chart color scheme
export const SUNBURST_COLORS_LEVEL_1 = [
  '#7dc242',
  '#274fa5',
  '#79287c',
  '#f78f48',
  '#057ebd',
];

export const SUNBURST_COLORS_LEVEL_2 = [
  '#057ebd',
  '#f78f48',
  '#79287c',
  '#0e3151',
  '#057ebd',
  '#7dc242',
];

// A maximum of 6 widgets are allowed
// for donuts only the following are required: type, title, dataName
//
// type: 'sunburst' | 'donut'
// title: string
// dataName: string
// datatable_level1_field: string
// datatable_level1_colors: string[]
// datatable_level2_field: string
// datatable_level2_colors: string[]
// sliceTitle: string (optional)
export const widgetConfig = [
  {
    type: 'donut',
    title: 'Projects by Fiscal Year',
    dataName: 'projectCountByFiscalYearSorted',
  },
  {
    type: 'donut',
    label: 'Projects by NCI DOC',
    dataName: 'projectCountByDOCSorted',
  },
  {
    type: 'donut',
    label: 'Projects by Award Amount',
    dataName: 'projectCountByAwardAmountSorted',
  },
  {
    type: 'donut',
    label: 'Publications by Year',
    dataName: 'publicationCountByYearSorted',
  },
  {
    type: 'donut',
    label: 'Publications by RCR Range',
    dataName: 'publicationCountByRCRTransformed',
  },
  {
    type: 'donut',
    label: 'Publications by Citations',
    dataName: 'publicationCountByCitationSorted',
  },
];
