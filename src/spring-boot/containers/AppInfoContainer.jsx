import { connect } from 'react-redux';

import AppInfo from '../components/AppInfo';


const AppInfoContainer = connect(
  state => {
    return {
      info: state.springBoot.info,
    };
  },
)(AppInfo);

export default AppInfoContainer;
