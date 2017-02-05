import React from 'react';

import Tabs from './Tabs';
import Tab from './Tab';
import TabPanels from './TabPanels';
import TabPanel from './TabPanel';

import AppInfoContainer from '../containers/AppInfoContainer';
import HealthInfoContainer from '../containers/HealthInfoContainer';
import ConfigPropsContainer from '../containers/ConfigPropsContainer';


export default function ComponentTabs({currentTab, onTabClick}) {
  const isTabActive = tabName => currentTab === tabName;

  const handleTabClick = tabName => {
    return () => {
      onTabClick(tabName);
    };
  };

  return (
    <div>

      <Tabs>
        <Tab onClick={handleTabClick('health')} isActive={isTabActive('health')}>Health</Tab>
        <Tab onClick={handleTabClick('infos')} isActive={isTabActive('infos')}>Infos</Tab>
        <Tab onClick={handleTabClick('config')} isActive={isTabActive('config')}>Config</Tab>
      </Tabs>

      <TabPanels>
        <TabPanel isActive={isTabActive('health')}>
          <HealthInfoContainer/>
        </TabPanel>
        <TabPanel isActive={isTabActive('infos')}>
          <AppInfoContainer />
        </TabPanel>
        <TabPanel isActive={isTabActive('config')}>
          <ConfigPropsContainer/>
        </TabPanel>
      </TabPanels>

    </div>
  )
}

ComponentTabs.propTypes = {
  currentTab: React.PropTypes.string.isRequired,
  onTabClick: React.PropTypes.func.isRequired,
};
