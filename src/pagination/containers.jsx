import { connect } from 'react-redux';

import {
  PaginationComponent as PaginationComponentBase,
} from './components';


export const PaginationComponent = connect(
  null,
  {},
)(PaginationComponentBase);
