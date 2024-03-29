import React, { useEffect, useState } from 'react';
import TabPanel from '../TabPanel';

const useGenerateTabData = ({
  tabContainers, activeFilters, programStats, activeTab,
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
          {programStats[tab.count]}
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
      programStats={programStats}
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
    if (programStats) {
      setGeneratedTabData(generateTabData());
    }
  }, [activeTab, programStats]);

  return { generatedTabData, programStats };
};

export default useGenerateTabData;
