import {
  GET_LANDING_PAGE_DATA_QUERY,
  landingPageData,
  STAT_VISUALS_BY_API,
} from './landingPageData';

const expectedMetrics = [
  ['Programs', 'numberOfPrograms'],
  ['Resources', 'numberOfResources'],
  ['Datasets', 'numberOfDatasets'],
  ['Projects', 'numberOfProjects'],
  ['Grants', 'numberOfGrants'],
  ['Publications', 'numberOfPublications'],
];

describe('landing page statistics configuration', () => {
  it('keeps the six metrics in the design order and binds Resources to GraphQL data', () => {
    expect(landingPageData.landingPageStatsBar.map(({ statTitle, statAPI }) => (
      [statTitle, statAPI]
    ))).toEqual(expectedMetrics);
  });

  it('selects the exact six landing statistic fields in display order', () => {
    const operation = GET_LANDING_PAGE_DATA_QUERY.definitions.find(
      ({ kind }) => kind === 'OperationDefinition',
    );
    const selectedFields = operation.selectionSet.selections.map(({ name }) => name.value);

    expect(selectedFields).toEqual(expectedMetrics.map(([, statAPI]) => statAPI));
  });

  it('defines a complete, unique visual identity for every API metric', () => {
    const apiNames = expectedMetrics.map(([, statAPI]) => statAPI);

    expect(Object.keys(STAT_VISUALS_BY_API)).toEqual(apiNames);

    const visualSignatures = apiNames.map((statAPI) => {
      const visual = STAT_VISUALS_BY_API[statAPI];
      expect(visual).toBeDefined();
      expect(Object.keys(visual).length).toBeGreaterThanOrEqual(2);
      expect(Object.values(visual).every((value) => (
        typeof value === 'string' && value.length > 0
      ))).toBe(true);
      return JSON.stringify(visual);
    });

    expect(new Set(visualSignatures).size).toBe(apiNames.length);
  });
});
