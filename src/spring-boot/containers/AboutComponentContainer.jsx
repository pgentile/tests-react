import { connect } from 'react-redux';

import AboutComponent from '../components/AboutComponent';
import * as actions from '../actions';


const AboutComponentContainer = connect(
  state => {
    return {
      baseUrl: state.springBoot.baseUrl,
      info: state.springBoot.info,
    };
  },
  {
    onLoad: actions.getAppInfo,
  },
)(AboutComponent);

export default AboutComponentContainer;
