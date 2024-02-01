import React, { useEffect, useState } from 'react';
import TabPanel from '../TabPanel';

const useGenerateTabData = ({
  tabContainers, activeFilters, projectStats, activeTab,
}) => {
  /* states */
  const [generatedTabData, setGeneratedTabData] = useState([]);

  /* Generators */
  const generatelabel = (tab) => ({
    content:
    (
      <span>
        {tab.name}
        <span className="count">
          (
          {projectStats[tab.count]}
          )
        </span>
      </span>
    ),
    style: tab.tabHeaderStyle,

  }
  );

  const generatePanel = (tab, index) => (

    <TabPanel
      tab={tab}
      config={tab}
      projectStats={projectStats}
      activeFilters={activeFilters}
      activeTab={index === activeTab}
    />
  );

  const generateTabData = () => tabContainers.map((tab, index) => ({
    label: generatelabel(tab),
    panel: generatePanel(tab, index),
  }));

  /* useEffects */
  useEffect(() => {
    if (projectStats) {
      setGeneratedTabData(generateTabData());
    }
  }, [activeTab, projectStats]);

  return { generatedTabData, projectStats };
};

export default useGenerateTabData;
