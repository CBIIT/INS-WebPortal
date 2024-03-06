import { sortType, InputTypes } from '@bento-core/facet-filter';

const PROGRAMS = 'Programs';
const GROUP = 'group';

// --------------- Facet resetIcon link configuration --------------
// Ideal size for resetIcon is 16x16 px
export const resetIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/Clear-icon.svg',
  alt: 'Reset icon',
  size: '12 px',
};

export const sectionLabel = {
  Programs: 'Filter by Programs',
};

// --------------- Dashboard Sidebar Sections styling --------------
export const facetSectionVariables = {
  Programs: {
    color: '#10A075',
    backgroundColor: '#C0E9D7',
    checkBoxColorsOne: '#E8F7DC',
    checkBoxColorsTwo: '#F5FDEE',
    height: '5px',
    isExpanded: true,
    hasSearch: true,
  },
};

export const facetsConfig = [{
  section: PROGRAMS,
  label: 'FOCUS AREA',
  field: GROUP,
  apiPath: 'projectCountByFocusArea',
  apiForFiltering: 'filterProjectCountByFocusArea',
  datafield: 'programs',
  type: InputTypes.CHECKBOX,
  sort_type: sortType.ALPHABET,
  show: true,
},
];

// // --------------- Dashboard Widgets configuration --------------
// // Sunburst chart color scheme
// export const SUNBURST_COLORS_LEVEL_1 = [
//   '#7dc242',
//   '#274fa5',
//   '#79287c',
//   '#f78f48',
//   '#057ebd',
// ];

// export const SUNBURST_COLORS_LEVEL_2 = [
//   '#057ebd',
//   '#f78f48',
//   '#79287c',
//   '#0e3151',
//   '#057ebd',
//   '#7dc242',
// ];

// // A maximum of 6 widgets are allowed
// // for donuts only the following are required: type, title, dataName
// //
// // type: 'sunburst' | 'donut'
// // title: string
// // dataName: string
// // datatable_level1_field: string
// // datatable_level1_colors: string[]
// // datatable_level2_field: string
// // datatable_level2_colors: string[]
// // sliceTitle: string (optional)
// export const widgetConfig = [
//   {
//     type: 'donut',
//     title: 'Projects by Fiscal Year',
//     dataName: 'projectCountByFiscalYearSorted',
//     sliceTitle: 'Projects',
//   },
//   {
//     type: 'donut',
//     title: 'Projects by NCI DOC',
//     dataName: 'projectCountByDOCSorted',
//     sliceTitle: 'Projects',
//   },
//   {
//     type: 'donut',
//     title: 'Projects by Award Amount',
//     dataName: 'projectCountByAwardAmountSorted',
//     sliceTitle: 'Projects',
//   },
//   {
//     type: 'donut',
//     title: 'Publications by Year',
//     dataName: 'publicationCountByYearSorted',
//     sliceTitle: 'Publications',
//   },
//   {
//     type: 'donut',
//     title: 'Publications by RCR Range',
//     dataName: 'publicationCountByRCRTransformed',
//     sliceTitle: 'Publications',
//   },
//   {
//     type: 'donut',
//     title: 'Publications by Citations',
//     dataName: 'publicationCountByCitationSorted',
//     sliceTitle: 'Publications',
//   },
// ];
