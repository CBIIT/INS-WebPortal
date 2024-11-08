import React, { useEffect } from 'react';
import {
  useLocation,
  useHistory,
  Link,
} from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Popover } from 'bootstrap';
import ReactHtmlParser from 'html-react-parser';
import externalIcon from '../../../assets/img/resource.svg';
import dataResourceIcon from '../../../assets/img/DataResource.png';
import {
  externalLinkIcon,
} from '../../../bento/datasetDetailData';

const SearchResultContainer = styled.div`
  width: 100%;
  padding-top: 10px;
  
  .messageContainer {
    padding: 0 0 10px 0;
    font-weight: bold;
  }

  .tableMessageContainer {
    padding: 10px 0 0 0;
    font-weight: bold;
  }

  .container {
    margin: 12px  16px;
    padding: 12px 20px;
    border: 1px solid #D3D3D3;
    font-size: 14px;
    background-color: #F8FBFD;
  }

  .container:hover {
    background-color: #f7f8fa;
  }

  .container a{
    color: #004187;
    text-decoration: none;
  }

  .container .headerRow {
    margin: 5px 5px 5px 0;
  }

  .container .headerRow .resultTitle {
    font-family: Inter;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    text-align: left;
    color: #20506A;
  }

  .resultSubTitle{
    font-family: Nunito;
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    text-align: left;
    color: #571AFF;
    padding-bottom: 10px !important;
    margin-bottom: 10px !important;
    border-bottom: 1px solid #D3D3D3;
  }

  .headerRow .piBlock {
    text-align: right;
    padding: 0;
  }

  .headerRow .typeBlock {
    background-color: #dcdcdc;
    border-radius: 20px;
    padding: 5px 10px;
    float: right;
    position: relative;
  }
  
  .headerRow .typeBlock .tooltiptext {
    visibility: hidden;
    color: white;
    background-color: rgb(80, 80, 80);
    width: 300px;
    border: 1px solid #004187;
    border-radius: 6px;
    padding: 5px 5px 5px 5px;
    
    text-align: left;
    text-transform: none;
    font-size: 12px;
    line-height: normal;
  
    /* Position the tooltip */
    position: absolute;
    z-index: 1;
    top: 100%;
    left: -100%;
    margin: 10px 0px 0px 0;
  }
  
  .headerRow .typeBlock:hover .tooltiptext {
    visibility: visible;
  }

  .headerRow .newtooltip {
    color: #212529;
    text-decoration: none;
  }

  .container .subHeaderRow {
    margin: 5px 5px 5px 0;
  }

  .subHeaderRow .col-sm {
    padding: 0 5px;
  }

  .subHeaderRow .col-sm .img1 {
    width: 14pt;
  }

  .subHeaderRow .col-sm .img2 {
    width: 16pt;
    height: 10pt;
    padding: 0 4px;
  }


  .subHeaderRow .col-sm a {
    font-weight: bold;
    color: #571AFF;
  }

  .subHeaderRow .fa-file {
    color: #6199d0;
  }

  .bodyRow span {
    font-weight: 600;
  }

  .bodyRow .itemSpan {
    font-family: Nunito;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: left;
    color: #212529;
  }

  .bodyRow b {
    margin: 0 3px 0 3px;
    padding: 1px 5px 1px 5px;
    border: 1px solid #9EC1DB;
    border-radius: 5px;
    background-color: #DFEEF9;
    color: #004187;
  }

  b b,
  b b b,
  b b b b,
  b b b b b {
    border: none !important;
  }

  .footerRow .itemSpan {
    padding: 0 5px;
    display: inline-block;
    margin-bottom: 5px;
  }

  .footerRow .additionalItemSpan {
    margin-right: 5px;
  }

  .footerRow b {
    margin: 0 3px 0 3px;
    padding: 1px 5px 1px 5px;
    border: 1px solid #9EC1DB;
    border-radius: 5px;
    background-color: #DFEEF9;
    color: #004187;
  }

  .footerRow a {
    margin: 0 3px 0 3px;
    padding: 1px 5px 1px 5px;
    border: 1px solid #9EC1DB;
    border-radius: 5px;
    font-weight: bold;
    background-color: #DFEEF9;
    color: #004187;
  }

  .descLink {
    margin: 0 3px 0 3px;
    padding: 1px 5px 1px 5px;
    border: 1px solid #9EC1DB;
    border-radius: 5px;
    font-weight: bold;
    background-color: #DFEEF9;
    color: #004187;
    line-height: 2.5em;
  }

  a[target="_blank"] {
    color: #571AFF;
    background-size: 32px;
    padding: 1px 30px 1px 5px;
  }

  .labelDiv{
    font-family: Inter;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    text-align: left;
    color: #1C58A1;
    margin-bottom: 10px;
    padding-left: 20px;
  }

  .bodyRow .textSpan {
    font-family: Nunito;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: left;
    color: #212529;
  }

  .bodyRow .caseCountHighlight {
    font-family: Nunito;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: left;
    color: #212529;
  }

  .bodyRow .sampleCountHighlight {
    font-family: Nunito;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: left;
    color: #212529;
  }

  .bodyRow .itemContinued {
    margin-left: 5px;
    font-weight: 600;
  }

  .container .footerRow:last-child {
    margin-bottom: 5px;
  }

  .footerRow label {
    font-weight: 600;
  }

  .datasetTableRow a {
    color: #6199d0;
    font-weight: 600;
    text-decoration: none;
  }

  .datasetTableRow .typeBlock .newtooltip {
    color: #212529;
    font-weight: normal;
    text-decoration: none;
  }

  .datasetTableRow span .tooltiptext {
    visibility: hidden;
    color: white;
    background-color: rgb(80, 80, 80);
    width: 300px;
    border: 1px solid #004187;
    border-radius: 6px;
    padding: 5px 5px 5px 5px;

    text-align: left;
    text-transform: none;
    font-size: 12px;
    line-height: normal;

    position: absolute;
    z-index: 1;
    margin: 30px 0px 0px -150px;
  }

  .datasetTableRow span:hover .tooltiptext {
    visibility: visible;
  }

  .externalLinkIcon {

  }
`;

const TableHead = styled.thead`
  th{
    cursor: pointer;
    user-select: none;
   -webkit-user-select: none;
   -khtml-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;

    &:hover {
      background-color: #c6d2db;
    }
  }
`;

const SortingOrder = styled.span`
  margin-top: 5px;
  width: 14px;
  height: 14px;
  position: absolute;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='rgba(75,108,134,1)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>");
`;

const SortingOrderDesc = styled.span`
  margin-top: 5px;
  width: 14px;
  height: 14px;
  position: absolute;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='none' stroke='rgba(75,108,134,1)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/></svg>");
  transform: rotate(-180deg);
`;

const toCapitalize = (str) => {
  const arr = str.split(' ');

  const result = arr.map((t) => t.charAt(0).toUpperCase() + t.slice(1));

  return result.join(' ');
};

const useQuery = () => new URLSearchParams(useLocation().search);

const replaceQueryStr = (query, sorting) => {
  let str = '';
  if (query.get('search_text')) {
    str += `&search_text=${query.get('search_text')}`;
  }
  if (query.get('filterByResource')) {
    str += `&filterByResource=${query.get('filterByResource')}`;
  }
  if (query.get('page')) {
    str += `&page=${query.get('page')}`;
  }
  if (query.get('pageSize')) {
    str += `&pageSize=${query.get('pageSize')}`;
  }
  str += `&sortBy=${sorting.k}`;
  str += `&sortOrder=${sorting.v}`;
  return str.substring(1);
};

function getCombinations(arr) {
  const result = [];

  // Helper function to generate combinations
  function combine(prefix, start) {
    for (let i = start; i < arr.length; i += 1) {
      const newCombo = `${prefix.trim()} ${arr[i].trim()}`;
      result.push(newCombo);
      combine(newCombo, i + 1); // Recursively generate combinations
    }
  }
  combine('', 0);
  return result;
}

const SearchResult = ({
  resultList,
  sort,
  search,
  onChangeSorting,
  onChangeSortingOrder,
  glossaryTerms,
}) => {
  const query = useQuery();
  const history = useHistory();

  const searchTerms = search.search_text.split(' ').filter((item) => item !== '');
  let searchCombination = getCombinations(searchTerms);

  // Check if search.filter.primary_disease exists and is an array
  if (search.filters && search.filters.primary_disease
    && Array.isArray(search.filters.primary_disease)
     && search.filters.primary_disease.length > 0) {
    // Concatenate the two arrays
    searchCombination = search.filters.primary_disease.concat(searchCombination);
  }

  searchCombination.sort((a, b) => b.length - a.length);

  const handleSortBy = (column) => {
    const name = column;
    if (name === sort.name) {
      const toSortBy = {};
      toSortBy.name = 'Dataset';
      toSortBy.k = 'dataset_title.sort';
      toSortBy.v = sort.v === 'asc' ? 'desc' : 'asc';
      const queryStr = replaceQueryStr(query, toSortBy);
      history.push(`/datasets?${queryStr}`);
      onChangeSortingOrder(toSortBy.v);
    } else {
      const toSortBy = {};
      toSortBy.name = 'Dataset';
      toSortBy.k = 'dataset_title.sort';
      toSortBy.v = sort.v;
      const queryStr = replaceQueryStr(query, toSortBy);
      history.push(`/datasets?${queryStr}`);
      onChangeSorting(toSortBy);
    }
  };

  const initializePopover = () => {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map((popoverTriggerEl) => new Popover(popoverTriggerEl));
  };

  function removeHTMLTags(str) {
    return str.replace(/<\/?[^>]+(>|$)/g, '');
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    initializePopover();
  }, [resultList, glossaryTerms]);

  return (
    <>
      <SearchResultContainer>
        {
          resultList.length === 0 ? (
            <div className="messageContainer">No result found. Please refine your search.</div>
          ) : resultList.map((rst, idx) => {
            const keyName = `sr_${idx}`;
            let description = removeHTMLTags(rst.content.description);
            if (description === null) {
              description = '';
            }
            if (description.length > 500) {
              description = `${description.substring(0, 500).replace(/<(?![b/])/g, '&lt;')} ...`;
            } else {
              description = description.replace(/<(?![b/])/g, '&lt;');
            }

            let hightLightedPrimaryDisease = rst.content.primary_disease;
            let hightLightedDesc = description;

            searchCombination.forEach((term) => {
              const regex = new RegExp(`(${term})`, 'gi'); // Case-insensitive search
              hightLightedPrimaryDisease = hightLightedPrimaryDisease.replace(regex, (match, p1) => `<b>${p1.slice(1)}</b>`);
              hightLightedDesc = hightLightedDesc.replace(regex, (match, p1) => `<b>${p1.slice(1)}</b>`);
            });

            const additionalMatches = [];

            const hideContent = [{ 'dbGaP URL': rst.content.dbGaP_URL },
              { 'PI name': rst.content.PI_name },
              { GPA: rst.content.GPA },
              { 'dataset doc': rst.content.dataset_doc },
              { 'dataset pmid': rst.content.dataset_pmid },
              { 'funding source': rst.content.funding_source },
              { 'related diseases': rst.content.related_diseases },
              { 'related terms': rst.content.related_terms },
              { 'study links': rst.content.study_links },
              { 'study type': rst.content.study_type },
              { 'assay method': rst.content.assay_method },
              { 'limitations for reuse': rst.content.limitations_for_reuse },
              { 'release date': rst.content.release_dat }];

            // Iterate through hideContent and check for matches
            hideContent.forEach((item) => {
              Object.entries(item).forEach(([key, value]) => {
                let highlightedValue = value;
                let foundMatch = false;

                searchCombination.forEach((term) => {
                  const regex = new RegExp(`(${term})`, 'gi'); // Case-insensitive search
                  if (value && value.includes(term)) { // Check if value contains the term
                    highlightedValue = highlightedValue.replace(regex, (match, p1) => `<b>${p1.slice(1)}</b>`); // Replace the term with bolded version
                    foundMatch = true;
                  }
                });

                if (foundMatch) {
                  additionalMatches.push({ [key]: highlightedValue });
                }
              });
            });
            return (
              <div key={keyName} className="container">
                <div className="row align-items-start headerRow">
                  <div className="col-sm resultTitle">
                    <Link to={`/dataset/${rst.content.dbGaP_phs}`}>
                      {rst.content.dataset_title}
                    </Link>
                  </div>
                </div>
                <div className="row align-items-start subHeaderRow">
                  <div className="col-sm resultSubTitle">
                    <img src={dataResourceIcon} alt="data-resource" className="img1" />
                    {rst.content.dbGaP_URL ? (
                      <a href={rst.content.dbGaP_URL} target="_blank" rel="noopener noreferrer" className="link">
                        {rst.content.dbGaP_phs}
                        <img
                          src={externalLinkIcon.src}
                          alt={externalLinkIcon.alt}
                          className="img2"
                        />
                      </a>
                    ) : (
                      <span className="link">
                        {rst.content.dbGaP_phs}
                      </span>
                    )}
                  </div>
                </div>
                {
                  <div className="row align-items-start bodyRow">
                    <div className="col labelDiv">
                      <span>Primary Disease:&nbsp;&nbsp;&nbsp;</span>
                      <span className="itemSpan">
                        {ReactHtmlParser(hightLightedPrimaryDisease)}
                      </span>
                    </div>
                  </div>
                }
                {
                  <div className="row align-items-start bodyRow">
                    <div className="col labelDiv">
                      <span>Participant Count:&nbsp;&nbsp;&nbsp;</span>
                      <span className="textSpan caseCountHighlight">
                        {rst.content.participant_count}
                      </span>
                    </div>
                  </div>
                }
                {
                  <div className="row align-items-start bodyRow">
                    <div className="col labelDiv">
                      <span>Sample Count:&nbsp;&nbsp;&nbsp;</span>
                      <span className="textSpan sampleCountHighlight">
                        {rst.content.sample_count}
                      </span>
                    </div>
                  </div>
                }
                {
                  description !== '' && (
                    <div className="row align-items-start bodyRow">
                      <div className="col labelDiv">
                        <span>Description:&nbsp;&nbsp;&nbsp;</span>
                        <span className="textSpan">
                          {ReactHtmlParser(hightLightedDesc)}
                        </span>
                      </div>
                    </div>
                  )
                }

                {
                additionalMatches.length > 0 && additionalMatches.map((match, index) => (
                  <div className="row align-items-start bodyRow" key={index}>
                    <div className="col labelDiv">
                      <span>
                        Other Match in
                        {' '}
                        {Object.keys(match)[0]}
                        :&nbsp;&nbsp;&nbsp;
                      </span>
                      <span className="textSpan">
                        {ReactHtmlParser(Object.values(match)[0])}
                      </span>
                    </div>
                  </div>
                ))
              }
              </div>
            );
          })
        }
      </SearchResultContainer>
    </>
  );
};

export default SearchResult;
