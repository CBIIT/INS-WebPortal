import { sortType, InputTypes } from '@bento-core/facet-filter';
import resetButtonActive from '../assets/icons/reset-button-active.svg';
import resetButtonDisabled from '../assets/icons/reset-button-disabled.svg';
import resetButtonHover from '../assets/icons/reset-button-hover.svg';

const PROGRAMS = 'Programs';
const GROUP = 'group';

// --------------- Facet resetIcon link configuration --------------
export const resetIcon = {
  active: resetButtonActive,
  disabled: resetButtonDisabled,
  hover: resetButtonHover,
  alt: 'Reset icon',
  size: '12px',
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
  label: 'Special Topic',
  field: GROUP,
  apiPath: 'projectCountByFocusArea',
  apiForFiltering: 'filterProjectCountByFocusArea',
  datafield: 'focus_area',
  type: InputTypes.CHECKBOX,
  sort_type: sortType.ALPHABET,
  show: true,
},
{
  section: PROGRAMS,
  label: 'Cancer Type',
  field: GROUP,
  apiPath: 'projectCountByCancerType',
  apiForFiltering: 'filterProjectCountByCancerType',
  datafield: 'cancer_type',
  type: InputTypes.CHECKBOX,
  sort_type: sortType.ALPHABET,
  show: true,
},
];

// --------------- Dashboard Widgets configuration --------------
export const widgetConfig = [
  {
    type: 'donut',
    title: 'Programs by Special Topic',
    dataName: 'programCountByFocusArea',
    sliceTitle: 'Programs',
  },
  {
    type: 'donut',
    title: 'Programs by NCI DOC',
    dataName: 'programCountByProgramDoc',
    sliceTitle: 'Programs',
  },
  {
    type: 'bar',
    title: 'Publications by Relative Citation Ratio',
    dataName: 'publicationCountByRelativeCitationRatio',
    sliceTitle: 'Publications',
  },
];
