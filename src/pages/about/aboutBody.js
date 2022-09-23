/* eslint-disable max-len */
import React from 'react';
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
                <h2 className="aboutContentHeader">
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
                  <br />
                  <li>
                    The pilot phase focuses on extramural grants from the Cancer Moonshot program and the Childhood Cancer Data Initiative (CCDI).
                  </li>
                  <br />
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
