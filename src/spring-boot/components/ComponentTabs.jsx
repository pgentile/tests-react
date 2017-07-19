import PropTypes from 'prop-types';
import React from 'react';

import Tabs from '../../core/components/Tabs';
import Tab from '../../core/components/Tab';

import AppInfoContainer from '../containers/AppInfoContainer';
import HealthInfoContainer from '../containers/HealthInfoContainer';
import ConfigPropsContainer from '../containers/ConfigPropsContainer';
import MetricsContainer from '../containers/MetricsContainer';
import EnvContainer from '../containers/EnvContainer';


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
        <Tab title="Health" onTitleClick={handleTabClick('health')} isActive={isTabActive('health')}>
          <HealthInfoContainer/>
        </Tab>
        <Tab title="Infos" onTitleClick={handleTabClick('infos')} isActive={isTabActive('infos')}>
          <AppInfoContainer />
        </Tab>
        <Tab title="Env" onTitleClick={handleTabClick('env')} isActive={isTabActive('env')}>
          <EnvContainer />
        </Tab>
        <Tab title="Config" onTitleClick={handleTabClick('config')} isActive={isTabActive('config')}>
          <ConfigPropsContainer/>
        </Tab>
        <Tab title="Metrics" onTitleClick={handleTabClick('metrics')} isActive={isTabActive('metrics')}>
          <MetricsContainer/>
        </Tab>
      </Tabs>

    </div>
  );
}

ComponentTabs.propTypes = {
  currentTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
};
