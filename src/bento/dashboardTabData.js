/* eslint-disable */
import gql from 'graphql-tag';
import { cellTypes } from '@bento-core/table';
import {
  customProjectsTabDownloadCSV,
  customPublicationsTabDownloadCSV,
} from './tableDownloadCSV';

// --------------- Tooltip configuration --------------
export const tooltipContent = {
  icon: 'https://raw.githubusercontent.com/google/material-design-icons/master/src/action/help/materialicons/24px.svg',
  alt: 'tooltipIcon',
  0: 'Click button to add selected files associated with the selected case(s).',
  1: 'Click button to add selected files associated with the selected sample(s).',
  2: 'Click button to add selected files.',
};

// --------------- Dahboard Table external link configuration --------------
// Ideal size for externalLinkIcon is 16x16 px
export const externalLinkIcon = {
  src: 'https://raw.githubusercontent.com/CBIIT/datacommons-assets/main/bento/images/icons/svgs/externalLinkIcon.svg',
  alt: 'External link icon',
};

// --------------- Tabs Header Data configuration --------------
export const tabs = [
  {
    id: 'project_tab',
    title: 'Grants',
    dataField: 'dataProject',
    count: 'numberOfProjects',
  },
  {
    id: 'publication_tab',
    title: 'Publications',
    dataField: 'dataPublication',
    count: 'numberOfPublications',
  },
];

// --------------- Tabs Header Style configuration --------------
export const tabIndex = [
  {
    title: 'Grants',
    primaryColor: '#F7D7F7',
    secondaryColor: '#86D6F0',
    selectedColor: '#C92EC7',
  },
  {
    title: 'Publications',
    primaryColor: '#E7E5F1',
    secondaryColor: '#C3DBD4',
    selectedColor: '#6D679E',
  },
];

export const DASHBOARD_QUERY_NEW = gql`
query searchProjects (          
  $programs: [String],
  $docs: [String],
  $fiscal_years: [String],
  $award_amounts: [String]
){
  searchProjects (          
      programs: $programs,
      docs: $docs,
      fiscal_years: $fiscal_years,
      award_amounts: $award_amounts,
  ) {
    numberOfPrograms
    numberOfProjects
    numberOfCoreProjects
    numberOfPublications
    projectCountByProgram{
      group
      subjects
    }
    projectCountByDOC{
      group
      subjects
    }
    projectCountByFiscalYear{
      group
      subjects
    }
    projectCountByAwardAmount{
      group
      subjects
    }
    publicationCountByYear{
      group
      subjects
    }
    publicationCountByRCR{
      group
      subjects
    }
    publicationCountByCitation
    {
      group
      subjects
    }
    filterProjectCountByProgram{
      group
      subjects
    }
    filterProjectCountByDOC{
      group
      subjects
    }
    filterProjectCountByFiscalYear{
      group
      subjects
    }
    filterProjectCountByAwardAmount{
      group
      subjects
    }
  }
}`;

export const FILTER_GROUP_QUERY = gql`
  query groupCounts($subject_ids: [String]){
    projectCountByProgram(project_ids: $subject_ids){
      group
      subjects
    }
    projectCountByDOC(project_ids: $subject_ids){
      group
      subjects
    }
    projectCountByFiscalYear(project_ids: $subject_ids){
      group
      subjects
    } 
    projectCountByAwardAmount(project_ids: $subject_ids){
      group
      subjects
    } 
    publicationCountByYear(project_ids: $subject_ids){
      group
      subjects
    }
    publicationCountByRCR(project_ids: $subject_ids){
      group
      subjects
    }
    publicationCountByCitation(project_ids: $subject_ids){
      group
      subjects
    }
    numberOfPublications(project_ids: $subject_ids)
  }`;

export const FILTER_QUERY = gql`
query searchProjects($programs: [String],
  $docs: [String],
  $fiscal_years: [String],
  $award_amounts: [String]) {
searchProjects(programs: $programs,
  docs: $docs,
  fiscal_years: $fiscal_years,
  award_amounts: $award_amounts) {
        numberOfPrograms
        numberOfProjects
        numberOfCoreProjects
        numberOfPublications
}
projectCountByProgram{
  group
  subjects
}
projectCountByDOC{
  group
  subjects
}
projectCountByFiscalYear{
  group
  subjects
}
projectCountByAwardAmount{
  group
  subjects
}
publicationCountByYear{
  group
  subjects
}
publicationCountByRCR{
  group
  subjects
}
publicationCountByCitation
{
  group
  subjects
}
filterProjectCountByProgram{
  group
  subjects
}
filterProjectCountByDOC{
  group
  subjects
}
filterProjectCountByFiscalYear{
  group
  subjects
}
filterProjectCountByAwardAmount{
  group
  subjects
}
}`;

// --------------- GraphQL query - Retrieve files tab details --------------
export const GET_PROJECTS_OVERVIEW_QUERY = gql`
query projectOverView(
  $programs: [String],
  $docs: [String],
  $fiscal_years: [String],
  $award_amounts: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
  ){
  projectOverView(
    programs: $programs,
    docs: $docs,
    fiscal_years: $fiscal_years,
    award_amounts: $award_amounts,
    first: $first,
    offset: $offset,
    order_by: $order_by,
    sort_direction: $sort_direction
    ) {
    project_id,
    queried_project_id,
    application_id,
    fiscal_year,
    activity_code,
    project_title,
    project_type,
    abstract_text,
    keywords,
    org_name,
    org_city,
    org_state,
    org_country,
    principal_investigators,
    lead_doc,
    program_officers,
    award_amount,
    nci_funded_amount,
    award_notice_date,
    project_start_date,
    project_end_date,
    full_foa,
    program
  }
}
  `;

export const GET_PUBLICATIONS_OVERVIEW_QUERY = gql`
query publicationOverView(
  $programs: [String],
  $docs: [String],
  $fiscal_years: [String],
  $award_amounts: [String],
  $offset: Int,
  $first: Int,
  $order_by: String,
  $sort_direction: String 
  ){
  publicationOverView(
    programs: $programs,
    docs: $docs,
    fiscal_years: $fiscal_years,
    award_amounts: $award_amounts,
    first: $first,
    offset: $offset,
    order_by: $order_by,
    sort_direction: $sort_direction
  ) {
    publication_id,
    pmc_id,
    year,
    journal,
    title,
    authors,
    publish_date,
    citation_count,
    relative_citation_ratio,
    doi,
    queried_project_ids
  }
}
  `;

export const GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL = gql`
query search (          
  $subject_ids: [String],
){
  fileIDsFromList (          
      subject_ids: $subject_ids,
  ) 
}
  `;

export const GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL = gql`
query search (          
  $sample_ids: [String],
){
  fileIDsFromList (          
    sample_ids: $sample_ids,
  ) 
}
  `;

export const GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL = gql`
query search (          
  $file_names: [String] 
){
  fileIDsFromList (          
      file_names: $file_names
  ) 
}
  `;

export const GET_ALL_FILEIDS_FROM_CASESTAB_FOR_ADD_ALL_CART = gql`
query subjectsAddAllToCart(
  $subject_ids: [String],
  $programs: [String],
  $studies: [String],
  $diagnoses: [String],
  $rc_scores: [String],
  $tumor_sizes: [String],
  $chemo_regimen: [String],
  $tumor_grades: [String],
  $er_status: [String],
  $pr_status: [String],
  $endo_therapies: [String],
  $meno_status: [String],
  $tissue_type: [String],
  $composition: [String],
  $association: [String],
  $file_type: [String],
  $age_at_index: [Float],
  $first: Int,
  $offset: Int= 0, 
  $order_by: String = "file_id",
  $sort_direction: String = "asc" 
  ){
  subjectOverview(
      subject_ids: $subject_ids,
      programs: $programs,
      studies: $studies,
      diagnoses: $diagnoses,
      rc_scores: $rc_scores,
      tumor_sizes: $tumor_sizes,
      chemo_regimen: $chemo_regimen,
      tumor_grades: $tumor_grades,
      er_status: $er_status,
      pr_status: $pr_status,
      endo_therapies: $endo_therapies,
      meno_status: $meno_status,
      tissue_type: $tissue_type,
      composition: $composition,
      association: $association,
      file_type: $file_type,
      age_at_index: $age_at_index,
      first: $first,
      offset: $offset,
      order_by: $order_by,
      sort_direction: $sort_direction
      ) {
      files
  }
}
    `;

export const GET_ALL_FILEIDS_FROM_SAMPLETAB_FOR_ADD_ALL_CART = gql`
    query samplesAddAllToCart(
      $subject_ids: [String],
      $sample_ids: [String],
      $programs: [String],
      $studies: [String],
      $diagnoses: [String],
      $rc_scores: [String],
      $tumor_sizes: [String],
      $chemo_regimen: [String],
      $tumor_grades: [String],
      $er_status: [String],
      $pr_status: [String],
      $endo_therapies: [String],
      $meno_status: [String],
      $tissue_type: [String],
      $composition: [String],
      $association: [String],
      $file_type: [String],
      $age_at_index: [Float],
      $first: Int,
      $offset: Int= 0, 
      $order_by: String = "file_id",
      $sort_direction: String = "asc" ){
      sampleOverview(
          subject_ids: $subject_ids,
          sample_ids: $sample_ids,
          programs: $programs,
          studies: $studies,
          diagnoses: $diagnoses,
          rc_scores: $rc_scores,
          tumor_sizes: $tumor_sizes,
          chemo_regimen: $chemo_regimen,
          tumor_grades: $tumor_grades,
          er_status: $er_status,
          pr_status: $pr_status,
          endo_therapies: $endo_therapies,
          meno_status: $meno_status,
          tissue_type: $tissue_type,
          composition: $composition,
          association: $association,
          file_type: $file_type,
          age_at_index: $age_at_index,
          first: $first,
          offset: $offset,
          order_by: $order_by,
          sort_direction: $sort_direction
          ) {
          files
      }
    }
        `;

export const GET_ALL_FILEIDS_FROM_FILESTAB_FOR_ADD_ALL_CART = gql`
query fileAddAllToCart(
  $subject_ids: [String],
  $programs: [String],
  $studies: [String],
  $diagnoses: [String],
  $rc_scores: [String],
  $tumor_sizes: [String],
  $chemo_regimen: [String],
  $tumor_grades: [String],
  $er_status: [String],
  $pr_status: [String],
  $endo_therapies: [String],
  $meno_status: [String],
  $tissue_type: [String],
  $composition: [String],
  $association: [String],
  $file_type: [String],
  $age_at_index: [Float],
  $first: Int,
  $offset: Int= 0, 
  $order_by: String = "file_id",
  $sort_direction: String = "asc"
 ){
  fileOverview(
      subject_ids:$subject_ids,
      programs: $programs,
      studies: $studies,
      diagnoses: $diagnoses,
      rc_scores: $rc_scores,
      tumor_sizes: $tumor_sizes,
      chemo_regimen: $chemo_regimen,
      tumor_grades: $tumor_grades,
      er_status: $er_status,
      pr_status: $pr_status,
      endo_therapies: $endo_therapies,
      meno_status: $meno_status,
      tissue_type: $tissue_type,
      composition: $composition,
      association: $association,       
      file_type: $file_type,
      age_at_index: $age_at_index,
      first: $first, 
      offset: $offset, 
      order_by: $order_by,
      sort_direction: $sort_direction
  ){
      file_id,
  }
}
            `;

// --------------- GraphQL query - Retrieve files tab details --------------
export const GET_FILES_NAME_QUERY = gql`
query fileOverview($file_ids: [String], $offset: Int = 0, $first: Int = 100000, $order_by:String ="file_name"){
  fileOverview(file_ids: $file_ids, offset: $offset,first: $first, order_by: $order_by) {
    file_name
  }
}
  `;

export const GET_FILE_IDS_FROM_FILE_NAME = gql`
  query (
      $file_name: [String],
      $offset: Int,
      $first: Int,
      $order_by: String
  )
  {
      fileIdsFromFileNameDesc(
          file_name:$file_name, 
          offset:$offset,
          first:$first,
          order_by:$order_by
      )
      {
          file_id
      }
  }`;

// --------------- Tabs Table configuration --------------
export const tabContainers = [
  {
    name: 'Grants',
    dataField: 'dataProject',
    api: GET_PROJECTS_OVERVIEW_QUERY,
    paginationAPIField: 'projectOverView',
    defaultSortField: 'project_id',
    defaultSortDirection: 'asc',
    count: 'numberOfProjects',
    buttonText: 'Add Selected Files',
    dataKey: 'project_id',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
    },
    columns: [
      {
        dataField: 'project_id',
        header: 'Grant ID',
        display: true,
        headerStyles: {
          width: '10%',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'queried_project_id',
        header: 'Project ID',
        cellType: cellTypes.LINK,
        linkAttr: {
          rootPath: '/project',
          pathParams: ['queried_project_id'],
        },
        display: true,
        headerStyles: {
          width: '10%',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'program',
        header: 'Program',
        cellType: cellTypes.LINK,
        linkAttr: {
          rootPath: '/program',
          pathParams: ['program'],
        },
        display: true,
        headerStyles: {
          width: '5%',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'project_title',
        header: 'Project Title',
        display: true,
        headerStyles: {
          width: '20%',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'principal_investigators',
        header: 'Principal Investigators',
        display: true,
        headerStyles: {
          width: '10%',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'program_officers',
        header: 'Program Officers',
        display: true,
        headerStyles: {
          width: '10%',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'lead_doc',
        header: 'Lead DOC',
        display: true,
        headerStyles: {
          width: '5%',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'activity_code',
        header: 'Activity Code',
        display: true,
        headerStyles: {
          width: '5%',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'award_amount',
        header: 'Award Amount',
        display: true,
        dataTransform: (money) => {
          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0,
          });

          return formatter.format(money);
        },
        headerStyles: {
          width: '10%',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'project_end_date',
        header: 'Project End Date',
        display: true,
        headerStyles: {
          width: '10%',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'fiscal_year',
        header: 'Fiscal Year',
        display: true,
        headerStyles: {
          width: '5%',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
    ],
    id: 'project_tab',
    tableMsg: {
      noMatch: 'No Matching Records Found',
    },
    tableID: 'project_tab_table',
    tabIndex: '0',
    tableDownloadCSV: customProjectsTabDownloadCSV,
    downloadFileName: 'projects_download',
  },
  {
    name: 'Publications',
    dataField: 'dataPublication',
    api: GET_PUBLICATIONS_OVERVIEW_QUERY,
    paginationAPIField: 'publicationOverView',
    defaultSortField: 'publication_id',
    defaultSortDirection: 'asc',
    count: 'numberOfPublications',
    buttonText: 'Add Selected Files',
    dataKey: 'publication_id',
    extendedViewConfig: {
      pagination: true,
      manageViewColumns: false,
    },
    columns: [
      {
        dataField: 'publication_id',
        header: 'PubMed ID',
        cellType: cellTypes.EXTERNAL_LINK,
        linkAttr: {
          rootPath: 'https://pubmed.ncbi.nlm.nih.gov',
          pathParams: ['publication_id'],
        },
        display: true,
        headerStyles: {
          width: '5%',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'queried_project_ids',
        header: 'Project IDs',
        cellType: cellTypes.LINK,
        linkAttr: {
          rootPath: '/project',
          pathParams: ['queried_project_ids'],
        },
        display: true,
        dataTransform: (ids) => {
          let transformedIds = '';

          for (let i = 0; i < ids.length; i += 1) {
            if (i === 0) {
              transformedIds = ids[0];
            } else {
              transformedIds = transformedIds + ', ' + ids[i];
            }
          }

          return transformedIds;
        },
        headerStyles: {
          width: '15%',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'title',
        header: 'Title',
        display: true,
        headerStyles: {
          width: '25%',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'authors',
        header: 'Authors',
        display: true,
        headerStyles: {
          width: '25%',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'citation_count',
        header: 'Citation Count',
        display: true,
        headerStyles: {
          width: '10%',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'relative_citation_ratio',
        header: 'Relative Citation Ratio',
        display: true,
        headerStyles: {
          width: '10%',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
      {
        dataField: 'publish_date',
        header: 'Publication Date',
        display: true,
        headerStyles: {
          width: '10%',
        },
        tooltipText: 'sort',
        role: cellTypes.DISPLAY,
      },
    ],
    id: 'publication_tab',
    tableID: 'publication_tab_table',
    tabIndex: '1',
    tableDownloadCSV: customPublicationsTabDownloadCSV,
    downloadFileName: 'publications_download',
  },
];
