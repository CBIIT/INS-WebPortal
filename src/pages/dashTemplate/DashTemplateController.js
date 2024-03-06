/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { getFilters } from '@bento-core/facet-filter';
import DashTemplateView from './DashTemplateView';
import { DASHBOARD_QUERY_NEW } from '../../bento/dashboardTabData';

const getDashData = (states) => {
  const {
    filterState,
    localFindUpload, localFindAutocomplete,
  } = states;

  const client = useApolloClient();
  async function getData(activeFilters) {
    const result = await client.query({
      query: DASHBOARD_QUERY_NEW,
      variables: activeFilters,
    })
      .then((response) => response.data);
    return result;
  }

  const [dashData, setDashData] = useState(null);

  // const dashData = {
  //   numberOfPrograms: 43,
  //   numberOfGrants: 2189,
  //   numberOfProjects: 588,
  //   numberOfPublications: 11873,
  //   projectCountByFocusArea: [
  //     {
  //       group: 'Broad Cancer Types',
  //       subjects: 592,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Pediatric/AYA',
  //       subjects: 69,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Health Disparities',
  //       subjects: 52,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Lung Cancer',
  //       subjects: 32,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'SPORE',
  //       subjects: 27,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'HIV/AIDS',
  //       subjects: 24,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Pancreas Cancer',
  //       subjects: 19,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Cervical Cancer',
  //       subjects: 17,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Colorectal Cancer',
  //       subjects: 15,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Liver Cancer',
  //       subjects: 10,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Leukemia',
  //       subjects: 6,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Brain Cancer',
  //       subjects: 4,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Breast Cancer',
  //       subjects: 4,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Esophageal Cancer',
  //       subjects: 4,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Gastric Cancer',
  //       subjects: 4,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Lymphoma',
  //       subjects: 2,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Bladder Cancer',
  //       subjects: 1,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Kidney Cancer',
  //       subjects: 1,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Multiple Myeloma',
  //       subjects: 1,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Ovarian Cancer',
  //       subjects: 1,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Thyroid Cancer',
  //       subjects: 1,
  //       __typename: 'FacetCount',
  //     },
  //   ],
  //   filterProjectCountByFocusArea: [
  //     {
  //       group: 'Broad Cancer Types',
  //       subjects: 592,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Pediatric/AYA',
  //       subjects: 69,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Health Disparities',
  //       subjects: 52,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Lung Cancer',
  //       subjects: 32,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'SPORE',
  //       subjects: 27,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'HIV/AIDS',
  //       subjects: 24,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Pancreas Cancer',
  //       subjects: 19,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Cervical Cancer',
  //       subjects: 17,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Colorectal Cancer',
  //       subjects: 15,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Liver Cancer',
  //       subjects: 10,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Leukemia',
  //       subjects: 6,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Brain Cancer',
  //       subjects: 4,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Breast Cancer',
  //       subjects: 4,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Esophageal Cancer',
  //       subjects: 4,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Gastric Cancer',
  //       subjects: 4,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Lymphoma',
  //       subjects: 2,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Bladder Cancer',
  //       subjects: 1,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Kidney Cancer',
  //       subjects: 1,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Multiple Myeloma',
  //       subjects: 1,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Ovarian Cancer',
  //       subjects: 1,
  //       __typename: 'FacetCount',
  //     },
  //     {
  //       group: 'Thyroid Cancer',
  //       subjects: 1,
  //       __typename: 'FacetCount',
  //     },
  //   ],
  //   projectCountByDOC: [
  //     {
  //       group: 'DCTD',
  //       subjects: 112,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'DCB',
  //       subjects: 96,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'DCCPS',
  //       subjects: 70,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'DCP',
  //       subjects: 22,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'SBIR',
  //       subjects: 16,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'OD',
  //       subjects: 10,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'CCT',
  //       subjects: 9,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'OCC',
  //       subjects: 6,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'CCG',
  //       subjects: 5,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'CRCHD',
  //       subjects: 3,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'CSSI',
  //       subjects: 1,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //   ],
  //   projectCountByFiscalYear: [
  //     {
  //       group: '2022',
  //       subjects: 135,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '2021',
  //       subjects: 73,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '2020',
  //       subjects: 41,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '2019',
  //       subjects: 37,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '2018',
  //       subjects: 32,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '2017',
  //       subjects: 18,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '2023',
  //       subjects: 14,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //   ],
  //   projectCountByAwardAmount: [
  //     {
  //       group: '$2M to $4M',
  //       subjects: 91,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '\u003c$1M',
  //       subjects: 84,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '$4M to $10M',
  //       subjects: 74,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '$1M to $2M',
  //       subjects: 72,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '\u003e$10M',
  //       subjects: 29,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //   ],
  //   publicationCountByYear: [
  //     {
  //       group: '1609459200000',
  //       subjects: 1149,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '1577836800000',
  //       subjects: 996,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '1640995200000',
  //       subjects: 994,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '1546300800000',
  //       subjects: 697,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '1514764800000',
  //       subjects: 535,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '1672531200000',
  //       subjects: 220,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '1483228800000',
  //       subjects: 156,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '1451606400000',
  //       subjects: 1,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //   ],
  //   publicationCountByRCR: [
  //     {
  //       group: '',
  //       subjects: 1017,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '2 to 5',
  //       subjects: 926,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '\u003e 5',
  //       subjects: 611,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '1.25 to 2',
  //       subjects: 555,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '0.8 to 1.25',
  //       subjects: 484,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '0.2 to 0.5',
  //       subjects: 444,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '0.5 to 0.8',
  //       subjects: 410,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '\u003c 0.2',
  //       subjects: 301,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //   ],
  //   publicationCountByCitation: [
  //     {
  //       group: '\u003c\u003d4',
  //       subjects: 1780,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '\u003e\u003d20',
  //       subjects: 1475,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '5 to 9',
  //       subjects: 729,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '10 to 14',
  //       subjects: 467,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '15 to 19',
  //       subjects: 297,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //   ],
  //   filterProjectCountByDOC: [
  //     {
  //       group: 'DCTD',
  //       subjects: 112,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'DCB',
  //       subjects: 96,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'DCCPS',
  //       subjects: 70,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'DCP',
  //       subjects: 22,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'SBIR',
  //       subjects: 16,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'OD',
  //       subjects: 10,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'CCT',
  //       subjects: 9,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'OCC',
  //       subjects: 6,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'CCG',
  //       subjects: 5,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'CRCHD',
  //       subjects: 3,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: 'CSSI',
  //       subjects: 1,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //   ],
  //   filterProjectCountByFiscalYear: [
  //     {
  //       group: '2022',
  //       subjects: 135,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '2021',
  //       subjects: 73,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '2020',
  //       subjects: 41,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '2019',
  //       subjects: 37,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '2018',
  //       subjects: 32,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '2017',
  //       subjects: 18,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '2023',
  //       subjects: 14,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //   ],
  //   filterProjectCountByAwardAmount: [
  //     {
  //       group: '$2M to $4M',
  //       subjects: 91,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '\u003c$1M',
  //       subjects: 84,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '$4M to $10M',
  //       subjects: 74,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '$1M to $2M',
  //       subjects: 72,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //     {
  //       group: '\u003e$10M',
  //       subjects: 29,
  //       __typename: 'SearchProjectsReturnObject',
  //     },
  //   ],
  //   __typename: 'SearchResult',
  // };

  // const setDashData = {
  //   'programsOverview:': [
  //     {
  //       data_link: 'https://cibmtr.org/CIBMTR/Resources/Publicly-Available-Datasets#',
  //       focus_area_str: 'Broad Cancer Types;Leukemia;Lymphoma',
  //       program_id: 'cibmtr_data_resource',
  //       program_link: 'https://cibmtr.org/',
  //       program_name: 'A Data Resource for Blood and Marrow Transplants and Adoptive Cellular Therapy Research',
  //       __typename: 'ProgramsOverview',
  //     },
  //     {
  //       data_link: 'https://itcr.cancer.gov/informatics-tools',
  //       focus_area_str: 'Broad Cancer Types',
  //       program_id: 'itcr',
  //       program_link: 'https://itcr.cancer.gov/about-itcr',
  //       program_name: 'ADVANCED DEVELOPMENT OF INFORMATICS TECHNOLOGIES FOR CANCER RESEARCH AND MANAGEMENT',
  //       __typename: 'ProgramsOverview',
  //     },
  //     {
  //       data_link: 'https://www.nciartnet.org/en/resources/data-sharing-catalog/',
  //       focus_area_str: 'Broad Cancer Types',
  //       program_id: 'artnet',
  //       program_link: 'https://www.nciartnet.org/en/',
  //       program_name: 'Acquired Resistance to Therapy Network',
  //       __typename: 'ProgramsOverview',
  //     },
  //     {
  //       data_link: 'https://www.researchallofus.org/',
  //       focus_area_str: 'Broad Cancer Types',
  //       program_id: 'all_of_us',
  //       program_link: 'https://allofus.nih.gov/',
  //       program_name: 'All of Us',
  //       __typename: 'ProgramsOverview',
  //     },
  //     {
  //       data_link: '',
  //       focus_area_str: 'Broad Cancer Types',
  //       program_id: 'cimac',
  //       program_link: 'https://dctd.cancer.gov/ResearchNetworks/cimacs_cidc_network.htm',
  //       program_name: 'CANCER IMMUNE MONITORING AND ANALYSIS CENTERS',
  //       __typename: 'ProgramsOverview',
  //     },
  //     {
  //       data_link: 'https://www.cancer.gov/ccg/research/functional-genomics/ctd2/data-portal',
  //       focus_area_str: 'Broad Cancer Types;Pediatric/AYA',
  //       program_id: 'ctd_2',
  //       program_link: 'https://www.cancer.gov/ccg/research/functional-genomics/ctd2',
  //       program_name: 'CTD^2: Cancer Target Discovery and Development',
  //       __typename: 'ProgramsOverview',
  //     },
  //     {
  //       data_link: 'https://portal.gdc.cancer.gov/exploration?filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22cases.project.program.name%22%2C%22value%22%3A%5B%22CGCI%22%5D%7D%7D%5D%7D',
  //       focus_area_str: 'Broad Cancer Types',
  //       program_id: 'cgci',
  //       program_link: 'https://www.cancer.gov/ccg/research/genome-sequencing/cgci',
  //       program_name: 'Cancer Genome Characterization Initiative',
  //       __typename: 'ProgramsOverview',
  //     },
  //     {
  //       data_link: '',
  //       focus_area_str: 'Broad Cancer Types',
  //       program_id: 'cidc',
  //       program_link: 'https://dctd.cancer.gov/ResearchNetworks/cimacs_cidc_network.html',
  //       program_name: 'Cancer Immunologic Data Commons',
  //       __typename: 'ProgramsOverview',
  //     },
  //     {
  //       data_link: 'https://www.cp-ctnet-dmacc.org/public/program-resources/',
  //       focus_area_str: 'Broad Cancer Types',
  //       program_id: 'cp_ctnet',
  //       program_link: 'https://prevention.cancer.gov/major-programs/cancer-prevention-clinical-trials-network-cp-ctnet',
  //       program_name: 'Cancer Prevention Clinical Trials Network (CP-CTNet)',
  //       __typename: 'ProgramsOverview',
  //     },
  //     {
  //       data_link: '',
  //       focus_area_str: 'Broad Cancer Types',
  //       program_id: 'cap_it',
  //       program_link: 'https://prevention.cancer.gov/major-programs/cancer-prevention-interception-targeted-agent-discovery-program',
  //       program_name: 'Cancer Prevention-Interception Targeted Agent Discovery Program',
  //       __typename: 'ProgramsOverview',
  //     },
  //   ],
  // };

  const activeFilters = {
    ...getFilters(filterState),
    subject_ids: [
      ...(localFindUpload || []).map((obj) => obj.subject_id),
      ...(localFindAutocomplete || []).map((obj) => obj.title),
    ],
  };

  useEffect(() => {
    const controller = new AbortController();
    getData(activeFilters).then((result) => {
      if (result.searchProjects) {
        setDashData(result.searchProjects);
      }
    });
    return () => controller.abort();
  }, [filterState, localFindUpload, localFindAutocomplete]);

  // --------------- Transform RCR data --------------
  const transformRCRData = (data) => {
    const publicationCountByRCRTransformedData = [];

    for (let i = 0; i < data.publicationCountByRCR.length; i += 1) {
      if (data.publicationCountByRCR[i].group !== 'N/A') {
        publicationCountByRCRTransformedData.push(data.publicationCountByRCR[i]);
      }
    }

    for (let j = 0; j < publicationCountByRCRTransformedData.length; j += 1) {
      if (publicationCountByRCRTransformedData[j].group === null) {
        publicationCountByRCRTransformedData[j].group = '0';
      }
    }

    publicationCountByRCRTransformedData.sort((a, b) => ((a.subjects < b.subjects) ? 1 : -1));

    return publicationCountByRCRTransformedData;
  };

  // --------------- Transform Donut data --------------
  const transformDonutData = (data) => {
    const transformedData = data;
    transformedData.publicationCountByRCRTransformed = transformRCRData(data);
    transformedData.projectCountByDOCSorted = data.projectCountByDOC.sort((a, b) => ((a.subjects < b.subjects) ? 1 : -1));
    transformedData.publicationCountByYearSorted = data.publicationCountByYear.sort((a, b) => ((a.subjects < b.subjects) ? 1 : -1));
    transformedData.projectCountByFiscalYearSorted = data.projectCountByFiscalYear.sort((a, b) => ((a.subjects < b.subjects) ? 1 : -1));

    for (let i = 0; i < transformedData.publicationCountByYearSorted.length; i += 1) {
      transformedData.publicationCountByYearSorted[i].group = new Date(parseInt(transformedData.publicationCountByYearSorted[i].group, 10)).getFullYear();
    }

    transformedData.projectCountByAwardAmountSorted = data.projectCountByAwardAmount.sort((a, b) => ((a.subjects < b.subjects) ? 1 : -1));
    transformedData.publicationCountByCitationSorted = data.publicationCountByCitation.sort((a, b) => ((a.subjects < b.subjects) ? 1 : -1));
    return transformedData;
  };

  if (dashData) {
    transformDonutData(dashData);
  }

  return { dashData, activeFilters };
};

const DashTemplateController = ((props) => {
  const { dashData, activeFilters } = getDashData(props);

  if (!dashData) {
    return (<CircularProgress />);
  }

  return (
    <DashTemplateView
      {...props}
      dashData={dashData}
      activeFilters={activeFilters}
    />
  );
});

const mapStateToProps = (state) => ({
  filterState: state.statusReducer.filterState,
  localFindUpload: state.localFind.upload,
  localFindAutocomplete: state.localFind.autocomplete,
});

export default connect(mapStateToProps, null)(DashTemplateController);
