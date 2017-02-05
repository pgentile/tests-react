import { createAction } from 'redux-actions';


export const DISMISS_ERROR = 'DISMISS_ERROR';

const dismissError = createAction(DISMISS_ERROR);

export {dismissError};
