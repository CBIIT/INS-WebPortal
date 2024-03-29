import gql from 'graphql-tag';
import programIcon from '../assets/icons/Icon-Programs.png';

// --------------- Icons configuration --------------
// Ideal size for programListingIcon is 100x100 px
// Ideal size for externalLinkIcon is 16x16 px
export const programListingIcon = {
  src: programIcon,
  alt: 'INS program logo',
};

// export const SEARCH = gql`
// query globalSearch($input: String){
//     globalSearch(input: $input) {
//         programs {
//             program_id
//         }
//         studies {
//             study_id
//         }
//         subjects {
//             subject_id
//         }
//         samples {
//             sample_id
//         }
//         files {
//             file_id
//         }
//         model {
//             node_name
//         }
//     }
// }
// `;

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
          org_name
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

// export const SEARCH_PAGE_RESULT_PROGRAM = gql`
// query globalSearch($input: String, $first: Int, $offset: Int){
//     globalSearch(
//         input: $input
//         first: $first
//         offset: $offset
//     ) {
//         programs {
//             type
//             program_id
//             program_name
//             program_code
//         }
// }
// }
// `;

// export const SEARCH_PAGE_RESULT_STUDIES = gql`
// query globalSearch($input: String, $first: Int, $offset: Int){
//     globalSearch(
//         input: $input
//         first: $first
//         offset: $offset
//     ) {
//         studies {
//             type
//             study_id
//             program_id
//             study_name
//             study_type
//             study_code
//         }
// }
// }
// `;

// export const SEARCH_PAGE_RESULT_SUBJECTS = gql`
// query globalSearch($input: String, $first: Int, $offset: Int){
//     globalSearch(
//         input: $input
//         first: $first
//         offset: $offset
//     ) {
//         subjects {
//             type
//             subject_id
//             program_id
//             diagnosis
//             age
//         }
// }
// }
// `;

// export const SEARCH_PAGE_RESULT_SAMPLES = gql`
// query globalSearch($input: String, $first: Int, $offset: Int){
//     globalSearch(
//         input: $input
//         first: $first
//         offset: $offset
//     ) {
//         samples {
//             type
//             sample_id
//             program_id
//             subject_id
//             diagnosis
//             sample_anatomic_site
//             tissue_type
//         }
// }
// }
// `;

// export const SEARCH_PAGE_RESULT_FILES = gql`
// query globalSearch($input: String, $first: Int, $offset: Int){
//     globalSearch(
//         input: $input
//         first: $first
//         offset: $offset
//     ) {
//         files {
//             type
//             file_id
//             file_name
//             file_format
//             program_id
//             subject_id
//             sample_id
//         }
// }
// }
// `;

// export const SEARCH_PAGE_RESULT_MODEL = gql`
// query globalSearch($input: String, $first: Int, $offset: Int){
//     globalSearch(
//         input: $input
//         first: $first
//         offset: $offset
//     ) {
//         model {
//             type
//             node_name
//             property_name
//             property_description
//             property_required
//             property_type
//             value
//             highlight
//         }
// }
// }
// `;

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

// export const SEARCH_PAGE_RESULTS = gql`
// query globalSearch($input: String, $first: Int, $offset: Int){
//     globalSearch(
//         input: $input
//         first: $first
//         offset: $offset
//     ) {
//         program_count
//         study_count
//         subject_count
//         sample_count
//         file_count
//         model_count
//         about_count
// }
// }
// `;

export const SEARCH_PAGE_RESULTS = gql`
query globalSearch($input: String, $first: Int, $offset: Int){
    globalSearch(
        input: $input
        first: $first
        offset: $offset
    ) {
        project_count
        about_count
}
}
`;
