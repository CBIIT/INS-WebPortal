import gql from 'graphql-tag';

// --------------- GraphQL query - Retrieve stats details --------------
export const GET_ALL_IDS = gql`{
  idsLists{
    subjectIds
    sampleIds
    fileIds
    fileNames
}
  }
  `;

export const GET_SUBJECT_IDS = gql`
  query search ($subject_ids: [String]){
    findSubjectIdsInList (subject_ids: $subject_ids) {
        subject_id
        program_id
    }
}
`;

export const GET_IDS_BY_TYPE = (type) => gql`{
  idsLists {
    ${type}
  }
}
`;

export const GET_SEARCH_NODES_BY_FACET = gql`
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
    numberOfPublications
    numberOfDatasets
    numberOfClinicalTrials
    numberOfPatents
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

export const GET_SEARCH_NODECOUNTS = gql`
  query nodeCounts($programs: [String]=[], $docs: [String] = [], $fiscal_years: [String]=[], $award_amounts: [String]=[]){
    nodeCountsFromLists(programs: $programs, docs: $docs, fiscal_years: $fiscal_years, award_amounts: $award_amounts) {
      projectIds
      publicationIds
      accessions
      clinicalTrialIds
      patentIds
      numberOfPrograms
      numberOfProjects
      numberOfPublications
      numberOfDatasets
      numberOfClinicalTrials
      numberOfPatents
  }
  filterProjectCountByProgram(programs: $programs, docs: $docs, fiscal_years: $fiscal_years, award_amounts: $award_amounts) {
    group
    subjects
  }
  filterProjectCountByDOC(programs: $programs, docs: $docs, fiscal_years: $fiscal_years, award_amounts: $award_amounts) {
    group
    subjects
  }
  filterProjectCountByFiscalYear(programs: $programs, docs: $docs, fiscal_years: $fiscal_years, award_amounts: $award_amounts) {
    group
    subjects
  }
  filterProjectCountByAwardAmount(programs: $programs, docs: $docs, fiscal_years: $fiscal_years, award_amounts: $award_amounts) {
    group
    subjects
  }
}
  `;

export const CASES_FILE_QUERY = gql`
query fileOverview(
    $subject_ids: [String],
    $file_ids: [String],
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
    $offset: Int, 
    $order_by:  String
    $sort_direction: String ){
    fileOverview(
        subject_ids: $subject_ids,
        file_ids: $file_ids,
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
        file_name,
        association,
        file_description,
        file_format,
        file_size,
        program,
        arm,
        subject_id,
        sample_id,
        diagnosis,
    }
}
`;

export const CASES_SAMPLE_QUERY = gql`
query sampleOverview(
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
    $offset: Int, 
    $order_by:  String
    $sort_direction: String ){
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
    ){
        sample_id,
        subject_id,
        program,
        arm,
        diagnosis,
        tissue_type,
        tissue_composition,
        sample_anatomic_site,
        sample_procurement_method,
        platform,
        files 
    }
}`;

export const SUBJECT_OVERVIEW_QUERY = gql`
query subjectOverview(
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
    $offset: Int, 
    $order_by: String,
    $sort_direction: String ){
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
        subject_id
        program
        program_id
        study_acronym
        study_short_description
        study_info
        diagnosis
        recurrence_score
        tumor_size
        tumor_grade
        er_status
        pr_status
        chemotherapy
        endocrine_therapy
        menopause_status
        age_at_index
        survival_time
        survival_time_unit
        files
        lab_procedures
        samples
    }
}
`;

export const widgetsSearchData = [
  {
    type: 'sunburst',
    label: 'Programs and Arms',
    dataName: 'armsByProgramsFromLists',
    mapWithDashboardWidget: 'armsByPrograms',
    datatable_level1_field: 'program',
    datatable_level2_field: 'study_acronym',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Diagnosis',
    dataName: 'subjectCountByDiagnosesFromLists',
    mapWithDashboardWidget: 'subjectCountByDiagnoses',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Recurrence Score',
    dataName: 'subjectCountByRecurrenceScoreFromLists',
    mapWithDashboardWidget: 'subjectCountByRecurrenceScore',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Tumor Size',
    dataName: 'subjectCountByTumorSizeFromLists',
    mapWithDashboardWidget: 'subjectCountByTumorSize',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Chemotherapy',
    dataName: 'subjectCountByChemotherapyRegimenFromLists',
    mapWithDashboardWidget: 'subjectCountByChemotherapyRegimen',
    titleText: 'Cases',
    show: true,
  },
  {
    type: 'donut',
    label: 'Endocrine Therapy',
    dataName: 'subjectCountByEndocrineTherapyFromLists',
    mapWithDashboardWidget: 'subjectCountByEndocrineTherapy',
    titleText: 'Cases',
    show: true,
  },
];

export const ageAtIndex = 10;
