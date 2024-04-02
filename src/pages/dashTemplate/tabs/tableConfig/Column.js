import React from 'react';
import ReactHtmlParser from 'html-react-parser';
import {
  Link,
  Typography,
} from '@material-ui/core';
import { cellTypes, headerTypes } from '@bento-core/table';
import DocumentDownloadView from '../../../../components/DocumentDownload/DocumentDownloadView';

export const CustomCellView = (props) => {
  const {
    downloadDocument,
    documentDownloadProps,
    displayEmpty,
    dataField,
    cellStyle,
    linkAttr,
  } = props;
  if (cellStyle === 'TRANSFORM') {
    return (<>{ReactHtmlParser(props[dataField].replaceAll(';', '<br />'))}</>);
  }

  if (cellStyle === 'TRANSFORM_LINK') {
    if (!props[dataField].includes(';')) {
      const url = `#${linkAttr.rootPath}/`.concat(props[linkAttr.pathParams]);
      return (
        <Link href={url} className={cellTypes.LINK}>
          <Typography>
            {props[dataField]}
          </Typography>
        </Link>
      );
    }

    const names = props[dataField].split(';');
    console.log('names: ', names);
    console.log('linkAttr.pathParams: ', linkAttr.pathParams);
    console.log('props[linkAttr.pathParams: ', props[linkAttr.pathParams]);
    const ids = props[linkAttr.pathParams].split(';');
    console.log('ids: ', ids);

    return (<>{ReactHtmlParser(props[dataField].replaceAll(';', '<br />'))}</>);
  }

  if (downloadDocument) {
    return (
      <DocumentDownloadView
        fileSize={props.file_size}
        caseId={props[documentDownloadProps.caseIdColumn]}
        fileFormat={props[documentDownloadProps.fileFormatColumn]}
        fileLocation={props[documentDownloadProps.fileLocationColumn]}
        {...documentDownloadProps}
        {...props}
        requiredACLs={props[dataField]}
      />
    );
  }

  if (typeof displayEmpty === 'boolean') {
    return (<Typography>{displayEmpty || props[dataField] ? props[dataField] : ''}</Typography>);
  }

  // other custom elem
  return (<></>);
};

export const CustomHeaderCellView = () => (<></>);

/**
* set column configuration
* @param {*} columns
* @returns config columns
*/
export const configColumn = (columns) => {
  /**
  * display columns as configuration
  * set custom cell render for column
  */
  const displayColumns = columns.filter((col) => col.display);
  const displayCustomView = [...displayColumns].map((column) => {
    if (column.cellType === cellTypes.CUSTOM_ELEM) {
      return {
        ...column,
        customCellRender: (props) => <CustomCellView {...props} />,
      };
    }
    return column;
  });

  /**
  * custom header view configuration
  */
  const displayCustomHeader = [...displayCustomView].map((column) => {
    if (column.headerType === headerTypes.CUSTOM_ELEM) {
      return {
        ...column,
        customColHeaderRender: (props) => <CustomHeaderCellView {...props} />,
      };
    }
    return column;
  });
  return displayCustomHeader;
};
