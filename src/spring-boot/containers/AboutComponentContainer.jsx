import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import AboutComponent from '../components/AboutComponent';
import * as actions from '../actions';


const selectInstanceName = createSelector(
  state => state.springBoot.info,
  info => {
    if (info && info.instanceInfo && info.instanceInfo.instance) {
      return info.instanceInfo.instance;
    }
    return '';
  },
);

const selectLoaded = createSelector(
  state => state.springBoot.info,
  info => info !== null,
);


const AboutComponentContainer = connect(
  state => {
    return {
      loaded: selectLoaded(state),
      instanceName: selectInstanceName(state),
    };
  },
  {
    onLoad: actions.getAppInfo,
  },
)(AboutComponent);

export default AboutComponentContainer;
