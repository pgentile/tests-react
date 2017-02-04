import { connect } from 'react-redux';

import ComponentTabs from '../components/ComponentTabs';
import * as actions from '../actions';


const ComponentTabsContainer = connect(
  state => {
    return {
      currentTab: state.springBoot.currentTab,
    };
  },
  {
    onTabClick: actions.changeTab,
  },
)(ComponentTabs);

export default ComponentTabsContainer;
