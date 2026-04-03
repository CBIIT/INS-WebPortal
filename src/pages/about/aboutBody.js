/* eslint-disable max-len */
import React from 'react';
import { Grid } from '@material-ui/core';
import Accordion from './Accordion';
import flowChart from '../../assets/about/About_Infographic.svg';
import './aboutBody.css';

const AboutBody = () => (
  <div className="aboutPageContainer">
    <div className="aboutPageHeader">
      About the Index of NCI Studies (INS)
    </div>
    <div className="aboutPageSection">
      <Grid item xs={12}>
        <div className="keyTakeawaysSection">
          <h3 className="keyTakeawaysSectionHeader">
            Key Takeaways
          </h3>
          <ul>
            <li>
              The National Cancer Institute (NCI) Index of NCI Studies (INS) compiles and shares information about research outputs produced by NCI-supported programs.
            </li>
            <li>
              The INS is continuing to evolve and is not yet comprehensive. Additional programs and output types will be added periodically.
            </li>
            <li>
              The INS incorporates information from
              {' '}
              <a target="_blank" rel="noopener noreferrer" href="https://reporter.nih.gov">NIH RePORTER</a>
              ,
              {' '}
              <a target="_blank" rel="noopener noreferrer" href="https://icite.od.nih.gov">NIH iCite</a>
              {' '}
              <a target="_blank" rel="noopener noreferrer" href="https://pubmed.ncbi.nlm.nih.gov">NCBI PubMed</a>
              {' '}
              <a target="_blank" rel="noopener noreferrer" href="https://www.ncbi.nlm.nih.gov/gap/">NCBI dbGaP</a>
              {' '}
              <a target="_blank" rel="noopener noreferrer" href="https://www.ncbi.nlm.nih.gov/geo/">NCBI GEO</a>
              , and
              {' '}
              <a target="_blank" rel="noopener noreferrer" href="https://cedcd.nci.nih.gov/">NCI CEDCD</a>
              {' '}
              with curated inputs.
            </li>
          </ul>
        </div>
      </Grid>
      <Grid container className="aboutPageSectionTop">
        <Grid item xs={12}>
          <Accordion title="OBJECTIVES AND SCOPE">
            <div className="aboutPageDisclaimerContent">
              <p>
                The National Cancer Institute (NCI) is pleased to release the next phase of the Index of NCI Studies (INS) to tackle the challenge of assembling NCI program information from publicly available resources. Building connections between NCI programs, projects, grants, and research outputs is a complex task typically addressed through manual curation by portfolio analysis experts. Due to the challenging nature of curating this information, the INS is not comprehensive - additional information will be added in an iterative fashion. For detailed documentation about the information within INS, please see our open-source
                {' '}
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/CBIIT/INS-Data">INS Data Gathering GitHub</a>
                {' '}
                repository.
              </p>
              <p>
                We look forward to hearing your feedback at
                {' '}
                <a className="link" href="mailto:nciofficeofdatasharing@mail.nih.gov?Subject=Index%20of%20NCI%20Studies%20feedback">
                  nciofficeofdatasharing@mail.nih.gov
                </a>
              </p>
              <ul className="aboutPageDisclaimerItems">
                <li>
                  <b>Programs:</b>
                  {' '}
                  NCI Programs are curated for use within INS by the
                  {' '}
                  <a target="_blank" rel="noopener noreferrer" href="https://datascience.cancer.gov/about/organization#ods">
                    NCI’s Office of Data Sharing
                  </a>
                  {' '}
                  and represent collections of scientific research projects and support that serve as hubs for scientific discovery. Programs are associated with Special Topic groupings (such as Pediatric or
                  {' '}
                  <a target="_blank" rel="noopener noreferrer" href="https://www.cancer.gov/research/key-initiatives/moonshot-cancer-initiative">
                    Cancer Moonshot
                    <sup>
                      SM
                    </sup>
                  </a>
                  ) as well as known sources of NCI funding (such as specific awards or Notices of Funding Opportunities). Programs may support multiple projects and their downstream efforts.
                  {' '}
                  <b>Not all NCI-supported programs are included in the current release of INS</b>
                  . Curation is ongoing; additional programs will be added, and existing program information will be updated in the future.
                </li>
                <li>
                  <b>Grants & Projects:</b>
                  {' '}
                  NCI-supported projects represent a focused scientific study or effort. Projects are groupings of grants, which represent yearly support and supplements. The INS primarily consists of
                  {' '}
                  <a target="_blank" rel="noopener noreferrer" href="https://www.cancer.gov/research/nci-role/extramural">
                    extramural projects
                  </a>
                  , but also includes some
                  {' '}
                  <a target="_blank" rel="noopener noreferrer" href="https://www.cancer.gov/research/nci-role/intramural">
                    intramural projects
                  </a>
                  {' '}
                  and a small number of projects supported by contracts.
                  {' '}
                  Only grants and projects that received NCI funding during or after year 2000 are included in the INS. The curation of grants and projects is automated using resources from the
                  {' '}
                  <a target="_blank" rel="noopener noreferrer" href="https://reporter.nih.gov/">
                    NIH RePORTER
                  </a>
                  .
                </li>
                <li>
                  <b>Publications:</b>
                  {' '}
                  The INS includes publications associated with NCI-supported projects. Only publications published during or after year 2000 and available on
                  {' '}
                  <a target="_blank" rel="noopener noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/">
                    NCBI PubMed
                  </a>
                  {' '}
                  are included within the INS, and many publications are associated with more than one project. The curation of publications and their association with projects is automated using resources from the
                  {' '}
                  <a target="_blank" rel="noopener noreferrer" href="https://reporter.nih.gov/">
                    NIH RePORTER
                  </a>
                  ,
                  {' '}
                  <a target="_blank" rel="noopener noreferrer" href="https://pubmed.ncbi.nlm.nih.gov/">
                    NCBI PubMed
                  </a>
                  , and
                  {' '}
                  <a target="_blank" rel="noopener noreferrer" href="https://icite.od.nih.gov/">
                    NIH iCite
                  </a>
                  . For more information about how publications are associated with projects, please see the
                  {' '}
                  <a target="_blank" rel="noopener noreferrer" href="https://report.nih.gov/faqs#:~:text=How%20are%20projects%20linked%20to%20Publications%3F">
                    NIH RePORTER FAQ
                  </a>
                  .
                </li>
                <li>
                  <b>Datasets:</b>
                  {' '}
                  The INS incorporates information and links to datasets and cohort studies generated from NCI-supported research. Initially, this includes references to NCI supported studies registered with
                  {' '}
                  <a target="_blank" rel="noopener noreferrer" href="https://www.ncbi.nlm.nih.gov/gap/">
                    NCBI Database of Phenotypes and Genotypes (dbGaP)
                  </a>
                  ,
                  {' '}
                  <a target="_blank" rel="noopener noreferrer" href="https://www.ncbi.nlm.nih.gov/geo/">
                    NCBI Gene Expression Omnibus (GEO)
                  </a>
                  , and
                  {' '}
                  <a target="_blank" rel="noopener noreferrer" href="https://cedcd.nci.nih.gov/">
                    NCI Cancer Epidemiology Descriptive Cohort Database (CEDCD)
                  </a>
                  ,
                  {' '}
                  though
                  {' '}
                  {' '}
                  <b>the INS will expand to other repositories and data resources in the future.</b>
                  {' '}
                  Dataset information is retrieved from source repositories using a combination of automated techniques and curation before it is reviewed and included within the INS.
                </li>
              </ul>
            </div>
          </Accordion>
        </Grid>
      </Grid>
      <Grid container className="aboutPageSectionMiddle">
        <Grid item xs={12}>
          <img className="flowChartSection" src={flowChart} alt="Flow chart displaying the relationship between INS research data and the INS site including programs, grants, publications, and datasets" id="flow-chart" />
          <img className="flowChartSectionMobile" src={flowChart} alt="Flow chart displaying the relationship between INS research data and the INS site including programs, grants, publications, and datasets" id="flow-chart-mobile" />
        </Grid>
      </Grid>
      <Grid container className="aboutPageSectionBottom">
        <Grid item xs={12}>
          <Accordion title="SITE FUNCTIONALITY">
            <div className="aboutPageSectionContent">
              <h3 className="aboutContentSubHeader">
                Home
              </h3>
              <p className="p-l-20">
                Provides an overview of the site, a snapshot of the number of programs, projects, grants, publications, and datasets along with links to other site pages.
              </p>
              <h3 className="aboutContentSubHeader">
                Programs
              </h3>
              <p className="p-l-20">
                Provides access to all Program-derived information within INS. Tabs for Programs, Projects, Grants, and Publications each show summary information and provide links to other resources where appropriate. Filters applied on the left will change the information displayed in all tabs and plots accordingly. Select a Program or Project link in the table to view additional information.
              </p>
              <h3 className="aboutContentSubHeader">
                Datasets & Cohorts
              </h3>
              <p className="p-l-20">
                Provides access to all information on Datasets and Cohorts captured within INS. The list of displayed Datasets can be narrowed using the keyword search box or the left-hand filters. Select a Dataset title to see additional information.
              </p>
              <h3 className="aboutContentSubHeader">
                About
              </h3>
              <p className="p-l-20">
                Describes the objectives and scope of the INS, its data gathering process, and the site’s functionality.
              </p>
            </div>
          </Accordion>
          <Accordion title="Contact Us">
            <div className="aboutPageSectionContent">
              <p>
                Thank you for visiting! For questions or feedback, please contact
                {' '}
                <a className="link" href="mailto:nciofficeofdatasharing@mail.nih.gov?Subject=Index%20of%20NCI%20Studies%20feedback">
                  nciofficeofdatasharing@mail.nih.gov
                </a>
              </p>
            </div>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  </div>
);

export default AboutBody;
