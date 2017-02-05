import { connect } from 'react-redux';

import TargetAppForm from '../components/TargetAppForm';
import * as actions from '../actions';


const TargetAppFormContainer = connect(
  state => {
    return {
      baseUrl: state.springBoot.baseUrl,
    };
  },
  {
    onUrlChange: actions.changeBaseUrl,
  },
)(TargetAppForm);

export default TargetAppFormContainer;
