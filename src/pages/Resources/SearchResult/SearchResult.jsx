import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Popover } from 'bootstrap';
import ReactHtmlParser from 'html-react-parser';
import dataResourceIcon from '../../../assets/img/DataResource.png';
import {
  externalLinkIcon,
} from '../../../bento/datasetDetailData';
import formatSemicolonSeparatedString from '../../../utils/formatString';

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
    padding: 0;
  }

  .subHeaderRow .col-sm .img0 {
    vertical-align: middle;
    margin-right: 5px;
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
    margin: 0 3px;
    padding: 0px 5px;
    border: 1px solid #9EC1DB;
    border-radius: 5px;
    background-color: #DFEEF9;
    color: #004187;
    font-size: 14px;
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

  .additionalMatches {
    line-height:26px;
    font-family: Nunito;
    font-size: 16px;
    font-weight: 400 !important;
    text-align: left;
    color: #212529;
    word-break: break-word;
  }

  .dataRepo {
    color: #004187;
    font-size: 16px;
    margin-right: 20px;
    margin-left: 0;
    font-weight: bold;
  }

`;

// Configuration for hidden fields that appear as "Other Match in..." when highlighted
// Display names match the Resource Details page headers
// formatSemicolon flag indicates whether to apply semicolon spacing formatting
const HIDDEN_FIELDS_CONFIG = [
  { fieldName: 'resource_tool_subtype', displayName: 'Tool Subtype', formatSemicolon: true },
  { fieldName: 'resource_research_type', displayName: 'Research Type', formatSemicolon: true },
  { fieldName: 'resource_access', displayName: 'Access Control', formatSemicolon: false },
  { fieldName: 'resource_doc', displayName: 'NCI Division/Office/Center', formatSemicolon: true },
  { fieldName: 'resource_poc_name', displayName: 'Contact Information', formatSemicolon: true },
  { fieldName: 'resource_poc_email', displayName: 'Contact Information', formatSemicolon: true },
  { fieldName: 'resource_full_description', displayName: 'Full Description', formatSemicolon: false },
];

const SearchResult = ({
  resultList,
  glossaryTerms,
}) => {
  const safeResultList = Array.isArray(resultList) ? resultList : [];

  const initializePopover = () => {
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map((popoverTriggerEl) => new Popover(popoverTriggerEl));
  };

  function removeHTMLTags(str) {
    if (!str) return '';
    return str.replace(/<\/?[a-z][\s\S]*?>/gi, '');
  }

  /**
   * Gets the highlighted value from backend if available, otherwise returns content value
   * Joins multiple highlighted values with semicolon separator
   */
  function getHighlightedValue(resultItem, fieldName) {
    if (!resultItem || !resultItem.content) {
      return '';
    }

    const highlightKey = fieldName;

    // Check if backend provided highlights for this field
    if (resultItem.highlight && resultItem.highlight[highlightKey]) {
      const highlightedValues = resultItem.highlight[highlightKey];
      // Join all highlighted values (backend may return multiple matches for same field)
      return Array.isArray(highlightedValues)
        ? highlightedValues.join('; ')
        : highlightedValues;
    }

    // Fallback to content value
    const contentValue = resultItem.content[fieldName];
    if (Array.isArray(contentValue)) {
      return contentValue.join('; ');
    }

    return contentValue !== null && contentValue !== undefined ? contentValue : '';
  }

  /**
   * Determines if a hidden field should be shown (backend found a match)
   */
  function shouldShowHiddenField(resultItem, fieldName) {
    const highlightKey = fieldName;
    return !!(
      resultItem.highlight
      && resultItem.highlight[highlightKey]
      && resultItem.highlight[highlightKey][0]
    );
  }

  /**
   * Removes all HTML tags EXCEPT <b> and </b> tags
   * Explicitly handles only opening <b> and closing </b> tags to prevent
   * self-closing tags like <b/> from passing through
   */
  function removeHTMLTagsExceptBold(str) {
    if (!str) return '';
    // Pattern: <(?!\/?b(?:\s|>))[^>]*> matches any tag that is NOT <b> or </b>,
    // so the replace call strips all tags while leaving <b> and </b> intact
    return str.replace(/<(?!\/?b(?:\s|>))[^>]*>/gi, '');
  }

  /**
   * Gets description value with proper truncation logic
   * Backend provides full description; frontend truncates if no match
   */
  function getDescriptionValue(resultItem) {
    const rawDescription = resultItem.content.resource_short_description || '';
    const cleanDescription = removeHTMLTags(rawDescription);

    // Check if backend highlighted the description
    const highlightKey = 'resource_short_description';
    const hasHighlight = !!(
      resultItem.highlight
      && resultItem.highlight[highlightKey]
      && resultItem.highlight[highlightKey][0]
    );

    if (hasHighlight) {
      // Backend highlighted the description - show FULL description with highlights
      // Remove all HTML tags except <b> tags, but DON'T truncate
      const highlightedDesc = resultItem.highlight[highlightKey][0];
      return removeHTMLTagsExceptBold(highlightedDesc);
    }

    // No highlight - truncate if longer than 500 chars
    if (cleanDescription.length > 500) {
      return `${cleanDescription.substring(0, 500)}...`;
    }

    return cleanDescription;
  }

  useEffect(() => {
    initializePopover();
  }, [resultList, glossaryTerms]);

  if (safeResultList.length === 0) {
    return (
      <SearchResultContainer>
        <div className="messageContainer">No result found. Please refine your search.</div>
      </SearchResultContainer>
    );
  }

  return (
    <SearchResultContainer>
      {safeResultList.map((rst, idx) => {
        const keyName = `sr_${idx}`;

        // Get highlighted values from backend (or fallback to content)
        const highlightedToolType = getHighlightedValue(rst, 'resource_tool_type');
        const highlightedResearchArea = getHighlightedValue(rst, 'resource_research_area');
        const highlightedDesc = getDescriptionValue(rst);

        // Build list of hidden fields that have matches (backend highlighted them)
        const additionalMatches = [];
        HIDDEN_FIELDS_CONFIG.forEach(({ fieldName, displayName, formatSemicolon }) => {
          if (shouldShowHiddenField(rst, fieldName)) {
            const highlightedValue = getHighlightedValue(rst, fieldName);
            const formattedValue = formatSemicolon
              ? formatSemicolonSeparatedString(highlightedValue)
              : highlightedValue;
            additionalMatches.push({ displayName, highlightedValue: formattedValue });
          }
        });

        return (
          <div key={keyName} className="container">
            <div className="row align-items-start headerRow">
              <div className="col-sm resultTitle">
                <Link to={`/resource/${rst.resource_uuid}`} data-testid="resource-title-link">
                  {rst.content.resource_title}
                </Link>
              </div>
            </div>
            <div className="row align-items-start subHeaderRow">
              <div className="col-sm resultSubTitle">
                <img src={dataResourceIcon} alt="data-resource" className="img1" />
                {rst.content.resource_source_url ? (
                  <a href={rst.content.resource_source_url} target="_blank" rel="noopener noreferrer" className="link" data-testid="resource-visit-link">
                    Visit Resource
                    <img
                      src={externalLinkIcon.src}
                      alt={externalLinkIcon.alt}
                      className="img2"
                    />
                  </a>
                ) : (
                  <span className="link" data-testid="resource-visit-link">
                    Visit Resource
                  </span>
                )}
              </div>
            </div>
            {
              highlightedToolType && (
                <div className="row align-items-start bodyRow">
                  <div className="col labelDiv">
                    <span>Tool Type:&nbsp;&nbsp;&nbsp;</span>
                    <span className="itemSpan" data-testid="tool-type">
                      {ReactHtmlParser(highlightedToolType)}
                    </span>
                  </div>
                </div>
              )
            }
            {
              highlightedResearchArea && (
              <div className="row align-items-start bodyRow">
                <div className="col labelDiv">
                  <span>Research Area:&nbsp;&nbsp;&nbsp;</span>
                  <span className="itemSpan" data-testid="research-area">
                    {ReactHtmlParser(highlightedResearchArea)}
                  </span>
                </div>
              </div>
              )
            }
            {
              highlightedDesc !== '' && (
                <div className="row align-items-start bodyRow">
                  <div className="col labelDiv">
                    <span>Description:&nbsp;&nbsp;&nbsp;</span>
                    <span className="textSpan" data-testid="description">
                      {ReactHtmlParser(highlightedDesc)}
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
                      {match.displayName}
                      :&nbsp;&nbsp;&nbsp;
                    </span>
                    <span className="additionalMatches" data-testid="additional-match">
                      {ReactHtmlParser(match.highlightedValue)}
                    </span>
                  </div>
                </div>
              ))
            }
          </div>
        );
      })}
    </SearchResultContainer>
  );
};

export default SearchResult;
