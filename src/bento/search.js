import gql from 'graphql-tag';
import client from '../utils/graphqlClient';

/** certain search data items */
/** used by the Global Search header autocomplete */
export const SEARCH_KEYS = {
  public: [],
  private: ['project_titles'],
};

export const SEARCH_DATAFIELDS = {
  public: [],
  private: ['title'],
};

/** used by the Global Search page results */
export const SEARCH_PAGE_KEYS = {
  private: [...SEARCH_KEYS.private],
  public: [],
};

export const SEARCH_PAGE_DATAFIELDS = {
  public: [],
  private: [...SEARCH_DATAFIELDS.private],
};

export const SEARCH = gql`
query globalSearch($input: String){
    globalSearch(input: $input) {
        project_titles {
          title
        }
    }
}
`;

export const SEARCH_PAGE_RESULT_PROJECT = gql`
query globalSearch($input: String, $first: Int, $offset: Int){
    globalSearch(
        input: $input
        first: $first
        offset: $offset
    ) {
        projects {
          type
          queried_project_id
          project_id
          application_id
          project_title
          abstract_text
          keywords
          project_org_name
          org_city
          org_state
          lead_doc
          principal_investigators
          program_officers
          full_foa
          program
        }
}
}
`;

export const SEARCH_PAGE_RESULT_ABOUT = gql`
query globalSearch($input: String, $first: Int, $offset: Int){
    globalSearch(
        input: $input
        first: $first
        offset: $offset
    ) {

        about_page {
            type
            text
            page
            title
        }
}
}
`;

export const SEARCH_PAGE_RESULTS = gql`
query globalSearch($input: String, $first: Int, $offset: Int){
    globalSearch(
        input: $input
        first: $first
        offset: $offset
    ) {
        about_count
}
}
`;

/**
 * Maps a datafield to the correct search query
 *
 * @param {string} field datatable field name
 * @param {boolean} isPublic whether the search is public or not
 */
export function getResultQueryByField(field, isPublic) {
  switch (field) {
    case 'all':
      return SEARCH_PAGE_RESULT_PROJECT;
    case 'projects':
      return SEARCH_PAGE_RESULT_PROJECT;
    case 'about_page':
      return SEARCH_PAGE_RESULT_ABOUT;
    default:
      return SEARCH_PAGE_RESULT_PROJECT;
  }
}

/**
 * Query the backend API for autocomplete results
 *
 * @param {object} inputValue search text
 * @param {boolean} isPublic is the search public or private
 */
export async function queryAutocompleteAPI(inputValue, isPublic) {
  const data = await client.query({
    query: SEARCH,
    variables: {
      input: inputValue,
    },
    context: {
      clientName: isPublic ? 'publicService' : '',
    },
  })
    .then((result) => (isPublic ? result.data.publicGlobalSearch : result.data.globalSearch))
    .catch(() => []);

  return data;
}

/**
 * Query the backend API for the search result counts by search string
 *
 * @param {string} inputValue search text
 * @param {boolean} isPublic whether to use the public service or not
 */
export async function queryCountAPI(inputValue, isPublic) {
  const data = await client.query({
    query: SEARCH_PAGE_RESULTS,
    variables: {
      input: inputValue,
    },
    context: {
      clientName: isPublic ? 'publicService' : '',
    },
  })
    .then((result) => (isPublic ? result.data.publicGlobalSearch : result.data.globalSearch))
    .catch(() => {});

  return data;
}

/**
 * Query the backend API for the search results by datafield
 *
 * @param {string} datafield
 * @param {object} input search query variable input
 * @param {boolean} isPublic is the search public or private
 */
export async function queryResultAPI(datafield, input, isPublic) {
  const data = await client.query({
    query: getResultQueryByField(datafield, isPublic),
    variables: input,
    context: {
      clientName: isPublic ? 'publicService' : '',
    },
  })
    .then((result) => (isPublic ? result.data.publicGlobalSearch : result.data.globalSearch))
    .catch(() => []);

  return data[datafield] || [];
}
