import migrateDatasetId from './datasetUtils';
import DATASET_ID_MAP from '../config/datasetIdMigrationConfig';

describe('migrateDatasetId', () => {
  /** @type {Array<[string, string]>} */
  let originalMap;

  beforeEach(() => {
    originalMap = [...DATASET_ID_MAP];
  });

  afterEach(() => {
    DATASET_ID_MAP.splice(0, DATASET_ID_MAP.length, ...originalMap);
    jest.restoreAllMocks();
  });

  it('passes through unknown IDs unchanged', () => {
    const result = migrateDatasetId('unknown-id');

    expect(result).toEqual({
      originalId: 'unknown-id',
      migratedId: 'unknown-id',
    });
  });

  it('migrates known IDs to latest ID', () => {
    const result = migrateDatasetId('CTD2_066');

    expect(result).toEqual({
      originalId: 'CTD2_066',
      migratedId: '7d356db1-e1de-5dcc-809c-97b4fbd7cb48',
    });
  });

  it('returns original ID and logs error when migration map is invalid', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => { });

    DATASET_ID_MAP.push(['CTD2_066', 'another-id']);

    const result = migrateDatasetId('CTD2_066');

    expect(result).toEqual({
      originalId: 'CTD2_066',
      migratedId: 'CTD2_066',
    });
    expect(spy).toHaveBeenCalled();
  });

  it('returns input and logs when incoming id is empty', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => { });

    const result = migrateDatasetId('');

    expect(result).toEqual({ originalId: '', migratedId: '' });
    expect(spy).toHaveBeenCalled();
  });

  it('returns input and logs when incoming id is not a string', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => { });

    const result = migrateDatasetId(null);

    expect(result).toEqual({ originalId: null, migratedId: null });
    expect(spy).toHaveBeenCalled();
  });

  it('handles multi-hop migration chains', () => {
    DATASET_ID_MAP.splice(0, DATASET_ID_MAP.length,
      ['A', 'B'],
      ['B', 'C'],
      ['C', 'D']);

    const result = migrateDatasetId('A');

    expect(result).toEqual({ originalId: 'A', migratedId: 'D' });
  });

  it('returns original id and logs when a cycle is detected', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => { });
    DATASET_ID_MAP.splice(0, DATASET_ID_MAP.length,
      ['A', 'B'],
      ['B', 'A']);

    const result = migrateDatasetId('A');

    expect(result).toEqual({ originalId: 'A', migratedId: 'A' });
    expect(spy).toHaveBeenCalled();
  });

  it('returns original id and logs when chain exceeds max hops', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => { });
    DATASET_ID_MAP.splice(0, DATASET_ID_MAP.length,
      ['A', 'B'],
      ['B', 'C'],
      ['C', 'D'],
      ['D', 'E'],
      ['E', 'F'],
      ['F', 'G']);

    const result = migrateDatasetId('A');

    expect(result).toEqual({ originalId: 'A', migratedId: 'A' });
    expect(spy).toHaveBeenCalled();
  });

  it('returns original id and logs when mapping tuple shape is invalid', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => { });
    DATASET_ID_MAP.splice(0, DATASET_ID_MAP.length);
    DATASET_ID_MAP.push('invalid-entry');

    const result = migrateDatasetId('A');

    expect(result).toEqual({ originalId: 'A', migratedId: 'A' });
    expect(spy).toHaveBeenCalled();
  });

  it('returns original id and logs when mapping contains empty values', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => { });
    DATASET_ID_MAP.splice(0, DATASET_ID_MAP.length, ['', 'B']);

    const result = migrateDatasetId('A');

    expect(result).toEqual({ originalId: 'A', migratedId: 'A' });
    expect(spy).toHaveBeenCalled();
  });
});
