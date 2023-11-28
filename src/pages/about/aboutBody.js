/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import aboutImage from '../../assets/about/About.png';
import flowChart from '../../assets/about/INS-Workflow.svg';
import './aboutBody.css';

const AboutBody = () => {
  const handleDownloadTemplate = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="aboutPageContainer">
        <div className="aboutPageHeader">
          About INS
        </div>
        <div className="aboutPageSection">
          <Grid container className="aboutPageDisclaimer">
            <Grid item xs={12}>
              <div className="aboutPageDisclaimerContent">
                <h2 className="disclaimerHeader">
                  GATHERING RESEARCH OUTPUTS: A CONTINUOUS CHALLENGE
                </h2>
                <p>
                  The National Cancer Institute (NCI) is excited to release initial phase of the Index of NCI Studies (INS) to tackle the challenge of assembling grants information from various publicly available resources into one place. Building connections between NCI programs, grants, and outputs is a complex task usually addressed through manual curation by portfolio analysis experts. As we work to automate the process and share this resource with the public, we would like to inform users of the known limitations within the data gathering process and information displayed by the INS. We are working on improving the data gathering process and will periodically release updates. This workflow allows us to improve the INS site in an iterative way.
                </p>
                <ul className="aboutPageDisclaimerItems">
                  <li>
                    <b>Funding Methods:</b>
                    &nbsp;This initial phase of the INS only gathers outputs from projects funded by
                    <a target="_blank" rel="noopener noreferrer" href="https://www.cancer.gov/research/nci-role/extramural">extramural grants</a>
                    . Other funding sources such as intramural grants and contracts will be addressed in the future.
                  </li>
                  <li>
                    <b>Initial Program Scope:</b>
                    &nbsp;This initial phase of the INS only gathers outputs from projects funded at least in part by grants associated with either of two programs: the
                    <a target="_blank" rel="noopener noreferrer" href="https://www.cancer.gov/research/key-initiatives/moonshot-cancer-initiative">
                      Cancer Moonshot
                      <sup>SM</sup>
                    </a>
                    and the
                    <a target="_blank" rel="noopener noreferrer" href="https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative">Childhood Cancer Data Initiative</a>
                    (CCDI). Though grouping projects under “programs” is useful for organizational purposes, authoritative links between programs and their projects and/or grants are not always clearly defined or publicly available. For use within the INS, a list of grants associated with the Cancer Moonshot was obtained from the U.S. Department of Health and Human Services (HHS)
                    <a target="_blank" rel="noopener noreferrer" href="https://taggs.hhs.gov/">Tracking Accountability in Government Grants System</a>
                    , while a list of grants associated with CCDI was provided by the NCI’s Office of Data Sharing. These lists were used as input into our automated data gathering process outlined below.
                  </li>
                  <li>
                    <b>Data Sourcing:</b>
                    &nbsp;The INS relies on several public resources to connect and enrich our data, which comes with the challenge of interoperability and inherent risk of propagating source errors. Details on grants are obtained from the
                    <a target="_blank" rel="noopener noreferrer" href="https://reporter.nih.gov/">NIH RePORTER</a>
                    resource. The information linking grants to a Division/Office/Center (DOC) are obtained from administrative databases, which may contain inconsistencies where the link between Program Officers, DOCs, and grants may change over the years. Publications, Clinical Trials, and Patents are obtained by automated searching of core project IDs against public resources:
                    <a target="_blank" rel="noopener noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/">PubMed</a>
                    ,
                    <a target="_blank" rel="noopener noreferrer" href="https://clinicaltrials.gov/">ClinicalTrials.gov</a>
                    , and
                    <a target="_blank" rel="noopener noreferrer" href="https://ppubs.uspto.gov/pubwebapp/">US Patent and Trademark Office</a>
                    , respectively. Publication information is further enriched with metrics obtained from
                    <a target="_blank" rel="noopener noreferrer" href="https://icite.od.nih.gov/">NIH iCite</a>
                    . Dataset information is obtained by indirectly linking datasets to core project IDs through the publications citing them. The initial phase of the INS is only gathering datasets from three repositories:
                    <a target="_blank" rel="noopener noreferrer" href="https://www.ncbi.nlm.nih.gov/gap/">database of Genotypes and Phenotypes (dbGaP)</a>
                    ,
                    <a target="_blank" rel="noopener noreferrer" href="https://www.ncbi.nlm.nih.gov/geo/">Gene Expression Omnibus (GEO)</a>
                    , and
                    <a target="_blank" rel="noopener noreferrer" href="https://www.ncbi.nlm.nih.gov/sra/">Sequence Read Archive (SRA)</a>
                    .
                  </li>
                  <li>
                    <b>Data Organization:</b>
                    &nbsp;The Moonshot program is not currently subdivided into Moonshot initiatives within the INS. Within INS, a project is a grouping of grants with identical
                    <a target="_blank" rel="noopener noreferrer" href="https://www.era.nih.gov/erahelp/commons/Commons/understandGrantNums.htm">Activity Code, Institute Code, and Serial Number</a>
                    . For example, “1
                    <u>P01CA210944</u>
                    -01” and “5
                    <u>P01CA210944</u>
                    -02” are both grants for project “P01CA210944”. This is sometimes also known as a core project ID or parent project. Grants provide funding to projects, which projects use to develop outputs. It is rarely possible to connect a research output directly to a grant rather than to a project. Because of this, INS gathers and displays grants that fund a project and public research outputs associated with that project, creating a “project bottleneck” effect between grant funding and research outputs. This best reflects the real-world connection between funding and publicly accessible research outputs. When displaying project details, such as Project Title and Description, the values from the most recently awarded grant associated with that project are used.
                  </li>
                  <li>
                    <b>Supplemental Grants:</b>
                    &nbsp;Supplemental grants (specifically, P30 supplements) and their outputs are not included in the initial phase of the INS. Supplements pose a particular challenge to the INS in the form of false positive associations, as researchers rarely cite supplements in published outputs. It is very difficult to differentiate outputs associated with a supplemental grant from those associated with a parent project, even with expert manual curation. Often, researchers themselves may not be able to differentiate outputs of supplemental grants separately from those of parent projects. We intend to include a curated subset of supplements and outputs where possible and appropriate in future releases.
                  </li>
                </ul>
              </div>
            </Grid>
          </Grid>
          <Grid container className="aboutPageSectionTop">
            <Grid item xs={8}>
              <div className="aboutPageSectionContent">
                <h2 className="aboutContentHeader">
                  INS OBJECTIVES AND SCOPE
                </h2>
                <p>
                  The goal of the INS is to enable access to research outputs generated by NCI-supported grants at a single location. The INS focuses on provided research outputs such as publications, datasets, or patents from various extramural grant funding. The INS obtains award information from key grant source systems such as NIH RePORTER to create the universe of known NCI-supported studies. For the pilot phase, the INS site displays information extracted from resources that hold publications (PubMed), data (specifically, the database of Genotypes and Phenotypes [dbGaP], Gene Expression Omnibus [GEO], and Sequence Read Archive [SRA]), clinical trials, and patents (US Patent and Trademark Office [USPTO]).
                </p>
              </div>
              <div className="aboutPageSectionContent">
                <h2 className="aboutContentHeader aboutContentHeaderMarginTop">
                  DATA GATHERING PROCESS
                </h2>
                <p>
                  The INS is piloting its data gathering process with two NCI-funded programs: the Cancer Moonshot program and the Childhood Cancer Data Initiative (CCDI). Each program consists of a list of awards (currently limited to extramural grants). General award information—such as project title, principal investigators, award amount, and award start and end dates—is obtained from NIH RePORTER. Research outputs from these projects are then obtained by website data gathering processes.
                </p>
                <p>
                  The INS data gathering process first queries PubMed with the list of project IDs, as authors typically list their funding sources in PubMed’s Grant Support section. The list of publications associated with those project IDs is collected and stored along with metadata on each publication. The data gathering process also collects datasets or clinical trials listed in PubMed’s Related Information section. The INS data gathering process queries ClinicalTrials.gov and the USPTO websites independently with the list of project IDs. All research outputs are thus linked to the project ID(s) that produced them, resulting in a coherent data model that links programs to grants to projects to outputs.
                </p>
              </div>
            </Grid>
            <Grid item xs={4}>
              <img className="aboutPageSectionImage" src={aboutImage} alt="about_image" id="about-image" />
              <div className="keyTakeawaysSection">
                <h3 className="keyTakeawaysSectionHeader">
                  Key Takeaways
                </h3>
                <ul>
                  <li>
                    The Index of NCI Studies (INS) gathers and displays information about research artifacts (publications, data, clinical trials, and patents) generated by NCI-supported grants in a single site to facilitate research portfolio analysis.
                  </li>
                  <li>
                    The initial phase focuses on extramural grants from the Cancer Moonshot program and the Childhood Cancer Data Initiative (CCDI).
                  </li>
                  <li>
                    The INS site provides detailed information for each program and project, as well as the research outputs generated by each project, which can be filtered according to the user’s specific interests.
                  </li>
                </ul>
              </div>
            </Grid>
          </Grid>
          <Grid container className="aboutPageSectionMiddle">
            <Grid item xs={12}>
              <h2 className="flowChartContentHeader">INS Data Gathering Flow</h2>
              <img className="flowChartImage" src={flowChart} alt="flow_chart" id="flow-chart" />
            </Grid>
          </Grid>
          <Grid container className="aboutPageSectionBottom">
            <Grid item xs={9}>
              <div className="aboutPageSectionContent">
                <h2 className="aboutContentHeader">
                  SITE FUNCTIONALITY
                </h2>
                <h3 className="aboutContentSubHeader">
                  Home Page
                </h3>
                <p className="p-l-20">
                  Provides an overview of the site, a snapshot of the number of programs, projects, grants, and research outputs, and links to other site pages.
                </p>
                <h3 className="aboutContentSubHeader">
                  Programs Page
                </h3>
                <p className="p-l-20">
                  Provides a list of programs currently included in the site, as well as the program websites and number of projects and publications in each program. A program’s details, including the list of projects associated with that program, can be accessed by clicking the program name.
                </p>
                <h3 className="aboutContentSubHeader">
                  Explore Page
                </h3>
                <p className="p-l-20">
                  Provides comprehensive lists of grants and research outputs in the site. The lists of grants and research outputs can be filtered by program, NCI DOC (Division, Office, or Center), fiscal year, and award amount. Doughnut charts provide basic project metrics that are updated as filters are applied. The user can choose to view the grant list or any of the research outputs (publications, datasets, etc.) by selecting the corresponding tab. A project’s details, including all associated grants and research outputs, can be accessed by clicking the project ID.
                </p>
                <h3 className="aboutContentSubHeader">
                  About Page
                </h3>
                <p className="p-l-20">
                  Describes the objectives and scope of the INS, its data gathering process, and the site’s functionality.
                </p>
              </div>
              <div className="aboutPageSectionContent">
                <h2 className="aboutContentHeader">
                  Contact INS
                </h2>
                <p>
                  For questions or feedback, please contact
                  <a className="link" href="mailto:nciofficeofdatasharing@mail.nih.gov?Subject=Index%20of%20NCI%20Studies%20feedback">
                    &nbsp;nciofficeofdatasharing@mail.nih.gov
                  </a>
                </p>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default AboutBody;
