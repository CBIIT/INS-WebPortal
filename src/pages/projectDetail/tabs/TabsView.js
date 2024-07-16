import React, { useState } from 'react';
import { Tabs as BentoTabs } from '@bento-core/tab';
import TabPanel from './TabPanel';
import { tabContainers } from '../../../bento/projectDetailTabData';
import customTheme from './DefaultTabTheme';

const Tabs = (props) => {
  const [currentTab, setCurrentTab] = useState(0);
  const handleTabChange = (event, value) => {
    setCurrentTab(value);
  };

  /**
  * 1. change <name> to <display> as array item
  * 2. <display> -> [tab.name, props.projectStats[tab.count]]
  */
  const getTabs = (tabs) => tabs.map((tab) => ({
    ...tab,
    name: tab.name,
    count: `(${props.projectStats[tab.count]})`,
    display: [tab.name, props.projectStats[tab.count]],
    clsName: `${tab.name}`.toLowerCase().replace(' ', '_'),
  }));

  const tabAreaStyle = {
    backgroundColor: '#ffffff',
    borderBottom: '3px solid #e7e5e5',
  };

  return (
    <>
      <BentoTabs
        tabItems={getTabs(tabContainers)}
        currentTab={currentTab}
        handleTabChange={handleTabChange}
        customTheme={customTheme}
      />
      {
        tabContainers.map((tab, index) => (
          <>
            <div hidden={currentTab !== index}>
              <div className="tabArea" style={tabAreaStyle}>
                <TabPanel
                  {...props}
                  tab={tab}
                  config={tab}
                  activeTab={index === currentTab}
                />
              </div>
            </div>
          </>
        ))
      }
    </>
  );
};

export default Tabs;
