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
    onUrlChange: actions.loadComponent,
  },
)(TargetAppForm);

export default TargetAppFormContainer;
