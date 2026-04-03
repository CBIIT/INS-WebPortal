import DATASET_ID_MAP from '../config/datasetIdMigrationConfig';

/**
 * Defines the maximum number of hops allowed to follow migration chains.
 * If a specific ID changes more than this number of times, the migration
 * will be aborted.
 *
 * @type {number}
 */
const DEFAULT_MAX_HOPS = 5;

/**
 * Builds a migration map from an array of migration edges.
 * @param {Array<[string, string]>} migrationEdges An array of tuples representing migration edges.
 * @returns {Map<string, string>} A map of migration edges.
 */
const buildMigrationMap = (migrationEdges) => {
  /** @type {Map<string, string>} */
  const map = new Map();

  migrationEdges.forEach((edge) => {
    if (!Array.isArray(edge) || edge.length !== 2) {
      throw new Error('datasetIdMigrationConfig entries must be [fromId, toId] tuples.');
    }

    const [from, to] = edge;
    if (!from || !to) {
      throw new Error('datasetIdMigrationConfig entries must contain non-empty from/to values.');
    }

    if (map.has(from)) {
      throw new Error(`Duplicate migration source detected for "${from}".`);
    }

    map.set(from, to);
  });

  return map;
};

/**
 * A utility function to migrate old dataset IDs to the latest dataset UUID.
 * It handles multi-hop migrations and detects cycles or excessive hops to prevent infinite loops.
 *
 * @param {string} incomingId The dataset ID to migrate, if applicable.
 * @returns {{ originalId: string, migratedId: string }} An object containing the mapping result.
 */
const migrateDatasetId = (incomingId) => {
  try {
    if (!incomingId || typeof incomingId !== 'string') {
      throw new Error('Invalid dataset ID provided for migration.');
    }

    const migrationMap = buildMigrationMap(DATASET_ID_MAP);
    const visited = new Set([incomingId]);
    let current = incomingId;
    let hops = 0;

    while (migrationMap.has(current)) {
      if (hops >= DEFAULT_MAX_HOPS) {
        throw new Error(`Migration chain exceeded ${DEFAULT_MAX_HOPS} hops from "${incomingId}".`);
      }

      const next = migrationMap.get(current);
      if (typeof next !== 'string') {
        break;
      }

      if (visited.has(next)) {
        throw new Error(`Cycle detected in dataset ID migrations at "${next}".`);
      }

      visited.add(next);
      current = next;
      hops += 1;
    }

    return { originalId: incomingId, migratedId: current };
  } catch (error) {
    console.error('Failed to migrate dataset ID:', error);
    return { originalId: incomingId, migratedId: incomingId };
  }
};

export default migrateDatasetId;
