import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Tabs, Tab, withStyles,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import { getOptions } from '@bento-core/util';
import TabView from './caseDetailTabView';
import TabThemeProvider from './caseDetailTabThemeConfig';
import TabLabel from './caseDetailTabLabel';
import {
  dataRoot, tabs, tooltipContent, tabContainers, tabIndex, externalLinkIcon,
} from '../../bento/caseDetailData';
import {
  fetchDataForCaseDetailTab,
} from './caseDetailReducer';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: '5px,5px,5px,5px' }}>
      {children}
    </Typography>
  );
}

const caseDetailTabController = ({ projectID, classes }) => {
  const currentActiveTabTitle = useSelector((state) => (state.caseDetailTab
    && state.caseDetailTab.currentActiveTab
    ? state.caseDetailTab.currentActiveTab
    : tabIndex[0].title));

  const tabValue = tabIndex.map((el) => el.title).indexOf(currentActiveTabTitle) || 0;

  const [currentTab, setCurrentTab] = React.useState(tabValue);

  const caseDetail = useSelector((state) => (state.caseDetailTab
    && state.caseDetailTab.datatable
    ? state.caseDetailTab.datatable : {}));

  const caseDetailStats = useSelector((state) => (state.caseDetailTab
    && state.caseDetailTab.data ? state.caseDetailTab.data : {}));

  const allFilters = useSelector((state) => (state.caseDetailTab
    && state.caseDetailTab.allActiveFilters ? state.caseDetailTab.allActiveFilters : {}));

  useEffect(() => {
    fetchDataForCaseDetailTab(tabIndex[0].title, [projectID]);
  }, []);

  const handleTabChange = (event, value) => {
    setCurrentTab(value);
    fetchDataForCaseDetailTab(tabIndex[value].title, [projectID]);
  };

  function getBorderStyle() {
    const style = '3px solid #42779a';
    return `${style}`;
  }

  function getTableColor() {
    return `${tabIndex[currentTab].primaryColor}`;
  }

  function getTabLabel(title, count) {
    const tabObj = tabIndex[currentTab];

    if (!tabObj || !tabObj.title) {
      window.location.reload();
    }

    // NOTE: refactor white color to theme's white color.
    const primaryColor = (tabObj.title === title) ? tabIndex[currentTab].selectedColor : undefined;
    const secondaryColor = (tabObj.title === title) ? tabObj.secondaryColor : undefined;

    return (
      <TabLabel
        title={title}
        count={count}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    );
  }

  // Tab Header Generator
  const TABs = tabs.map((tab, index) => (
    <Tab
      key={index}
      id={tab.id}
      label={
        getTabLabel(tab.title, caseDetailStats[dataRoot][tab.count]
          ? caseDetailStats[dataRoot][tab.count] : 0)
      }
    />
  ));

  // Tab table Generator
  const TABContainers = tabContainers.map((container) => (
    <TabContainer id={container.id}>
      <TabView
        options={getOptions(container, classes)}
        data={caseDetail[container.dataField] ? caseDetail[container.dataField] : 'undefined'}
        customColumn={container}
        tableID={container.tableID}
        // eslint-disable-next-line jsx-a11y/tabindex-no-positive
        tabIndex={container.tabIndex}
        externalLinkIcon={externalLinkIcon}
        count={caseDetailStats[dataRoot][container.count]
          ? caseDetailStats[dataRoot][container.count] : 0}
        api={container.api}
        paginationAPIField={container.paginationAPIField}
        defaultSortCoulmn={container.defaultSortField || ''}
        defaultSortDirection={container.defaultSortDirection || 'asc'}
        dataKey={container.dataKey}
        allFilters={{ ...allFilters, ...{ subject_ids: [] } }}
        tableDownloadCSV={container.tableDownloadCSV || false}
        tooltipMessage={tooltipContent[currentTab]}
        tooltipIcon={tooltipContent.icon}
        tooltipAlt={tooltipContent.alt}
      />
    </TabContainer>
  ));

  return (
    <>
      <TabThemeProvider tableBorder={getBorderStyle()} tablecolor={getTableColor()}>
        <Tabs
          classes
          value={currentTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          {TABs}
        </Tabs>
        <SwipeableViews
          index={currentTab}
          onChangeIndex={handleTabChange}
          animateTransitions={false}
          style={{ overflowX: 'hidden' }}
        >
          {TABContainers}
        </SwipeableViews>
      </TabThemeProvider>
    </>
  );
};

const styles = () => ({
  button: {
    borderRadius: '10px',
    width: '330px',
    height: '27px',
    lineHeight: '18px',
    fontSize: '10pt',
    color: '#fff',
    backgroundColor: '#ff7f15',
  },
  snackBarMessageIcon: {
    verticalAlign: 'middle',
  },
  messageTop: {
    position: 'absolute',
    right: '20px',
    zIndex: '300',
  },
});
export default withStyles(styles, { withTheme: true })(caseDetailTabController);
