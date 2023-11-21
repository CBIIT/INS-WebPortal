import {
  transformInitialDataForSunburst,
} from '@bento-core/util';

/**
 * Removes empty subjects from donut data.
 *
 * @param {object} data
 * @returns {object} filtered data
 */
const removeEmptySubjectsFromDonutData = (data) => data.filter((item) => item.subjects !== 0);

/**
 * Returns the widgets data formatted as key:dataset pairs
 *
 * @param {object} data
 * @param {object} custodianConfig
 * @return {object} formatted data
 */
function formatWidgetData(data, custodianConfig) {
  const formatted = custodianConfig.reduce((acc, widget) => {
    const {
      type, dataName, datatableLevel1Field, datatableLevel2Field,
      datatableLevel1Colors, datatableLevel2Colors,
    } = widget;

    const dataset = type === 'sunburst'
      ? transformInitialDataForSunburst(data[dataName], datatableLevel1Field, datatableLevel2Field, 'children', datatableLevel1Colors, datatableLevel2Colors)
      : removeEmptySubjectsFromDonutData(data[dataName]);

    return { ...acc, [dataName]: dataset };
  }, {});

  return formatted;
}

export { formatWidgetData as default };
