import { connect } from 'react-redux';

import { ChartsComponent as ChartsComponentBase } from './components';
import * as actions from './actions';


export const ChartsComponent = connect(
  (state) => {
    return {
      data: state.charts.data,
    };
  },
  {
    onRefresh: actions.refreshChart,
  },
)(ChartsComponentBase);
