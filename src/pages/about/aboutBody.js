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
                  GATHERING RESEARCH OUTPUTS: AN ONGOING CHALLENGE
                </h2>
                <p>
                  The National Cancer Institute (NCI) is excited to release the first phase of the Index of NCI Studies (INS) to tackle the challenge of assembling project information from various publicly available resources into one place. Building connections between NCI programs, projects, and outputs is a complex task usually addressed through manual curation by specialists performing portfolio analysis. As we work to automate the process and share this resource with the public, we want to remain transparent about known limitations within the data gathered and displayed by the INS. Releasing updates to INS in phases allows us to iteratively improve the site.
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
                    &nbsp;This initial phase of the INS only gathers outputs from projects funded under two programs: the
                    <a target="_blank" rel="noopener noreferrer" href="https://www.cancer.gov/research/key-initiatives/moonshot-cancer-initiative">
                      Cancer Moonshot
                      <sup>SM</sup>
                    </a>
                    and the
                    <a target="_blank" rel="noopener noreferrer" href="https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative">Childhood Cancer Data Initiative</a>
                    (CCDI). Though grouping projects under “programs” is useful for organizational purposes, the program-project link is not always clearly defined or publicly available. A list of projects associated with the Cancer Moonshot was obtained from the U.S. Department of Health and Human Services (HHS)
                    <a target="_blank" rel="noopener noreferrer" href="https://taggs.hhs.gov/">Tracking Accountability in Government Grants System</a>
                    , while a list of projects associated with CCDI was provided by the NCI’s Office of Data Sharing. These lists were then input into our automated data gathering process outlined below.
                  </li>
                  <li>
                    <b>Data organization:</b>
                    &nbsp;Projects are currently organized within the INS by the full grant number (e.g., “1U24CA224319-01”), which means that a single core project ID (e.g., “CA224319”) may be listed several times with multiple funding years or methods. However, because researchers usually cite core project IDs (rather than full grant numbers) in their published outputs, the INS groups data outputs by core project ID. This leads to some known false positive results where outputs associated with a core project ID are associated with a full grant number when they should not be. This discrepancy is being evaluated for improvement in a future release.
                  </li>
                  <li>
                    <b>Data sourcing:</b>
                    &nbsp;The INS relies on several public resources to connect and enrich our data, which comes with the challenge of interoperability and inherent risk of propagating source errors. Details on projects (using full grant numbers) are obtained from the
                    <a target="_blank" rel="noopener noreferrer" href="https://reporter.nih.gov/">NIH RePORTER</a>
                    resource. Publications, Clinical Trials, and Patents are obtained by automated searching of core project IDs against public resources:
                    <a target="_blank" rel="noopener noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/">PubMed</a>
                    ,
                    <a target="_blank" rel="noopener noreferrer" href="https://clinicaltrials.gov/">ClinicalTrials.gov</a>
                    , and
                    <a target="_blank" rel="noopener noreferrer" href="https://ppubs.uspto.gov/pubwebapp/">US Patent and Trademark Office</a>
                    , respectively. Publication information is further enriched with metrics obtained from
                    <a target="_blank" rel="noopener noreferrer" href="https://icite.od.nih.gov/">NIH iCite</a>
                    . Dataset information is obtained by indirectly linking datasets to core project IDs through the publications citing them. The initial phase of the INS is only gathering datasets from three genomic repositories:
                    <a target="_blank" rel="noopener noreferrer" href="https://www.ncbi.nlm.nih.gov/gap/">database of Genotypes and Phenotypes (dbGaP)</a>
                    ,
                    <a target="_blank" rel="noopener noreferrer" href="https://www.ncbi.nlm.nih.gov/geo/">Gene Expression Omnibus (GEO)</a>
                    , and
                    <a target="_blank" rel="noopener noreferrer" href="https://www.ncbi.nlm.nih.gov/sra/">Sequence Read Archive (SRA)</a>
                    .
                  </li>
                  <li>
                    <b>Supplemental grants:</b>
                    &nbsp;Supplemental grants (specifically, P30 supplements) and their outputs are not included in the initial phase of the INS. Supplements pose a particular challenge to the INS, as researchers rarely cite supplements in published outputs. It is very difficult to differentiate outputs associated with a supplement from those associated with a core/parent grant, even with expert manual curation. Often, researchers themselves may not be able to differentiate outputs of supplemental grants separately from those of core/parent grants. We aim to avoid false positive associations between research outputs and funding sources that could result from inclusion of supplemental funding, but do intend to include a curated subset of supplements and outputs where possible in future releases.
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
                  The INS is piloting its data gathering process with two NCI-funded programs: the Cancer Moonshot program and the Childhood Cancer Data Initiative (CCDI). Each program consists of a list of awards. General award information—such as project title, principal investigators, award amount, and award start and end dates—is obtained from NIH RePORTER. Research outputs from these projects are then obtained by website data gathering processes.
                </p>
                <p>
                  The INS data gathering process first queries PubMed with the list of project IDs, as authors typically list their funding sources in PubMed’s Grant Support section. The list of publications associated with those project IDs is collected and stored along with metadata on each publication. The data gathering process also collects datasets or clinical trials listed in PubMed’s Related Information section. The INS data gathering process queries ClinicalTrials.gov and the USPTO websites independently with the list of project IDs. All research outputs are thus linked to the project ID(s) that produced them, resulting in a coherent data model that links programs to projects to outputs.
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
                    The pilot phase focuses on extramural grants from the Cancer Moonshot program and the Childhood Cancer Data Initiative (CCDI).
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
                  Provides an overview of the site, a snapshot of the number of programs, projects, and research outputs, and links to other site pages.
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
                  Provides comprehensive lists of projects and research outputs in the site. The lists of projects and research outputs can be filtered by program, NCI DOC (Division, Office, or Center), fiscal year, and award amount. Doughnut charts provide basic project metrics that are updated as filters are applied. The user can choose to view the project list or any of the research outputs (publications, datasets, etc.) by selecting the corresponding tab. A project’s details can be accessed by clicking the project ID.
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
