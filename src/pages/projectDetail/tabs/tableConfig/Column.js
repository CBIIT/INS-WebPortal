import React from 'react';
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
  if (cellStyle === 'TRANSFORM_LINK') {
    const names = props[dataField].split(';');
    const ids = props[linkAttr.pathParams].split(';');
    const contentArray = [];

    for (let i = 0; i < ids.length; i += 1) {
      const url = `#${linkAttr.rootPath}/`.concat(ids[i]);

      const linkElement = (
        <Link key={i} href={url} className={cellTypes.LINK}>
          <Typography>
            {names[i]}
          </Typography>
        </Link>
      );

      contentArray.push(linkElement);
    }

    return <>{contentArray}</>;
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
