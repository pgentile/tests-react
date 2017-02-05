import { createAction } from 'redux-actions';

import * as api from './api';

const PREFIX = 'springBoot';

export const CHANGE_BASE_URL = `${PREFIX}/CHANGE_BASE_URL`;

export const GET_APP_HEALTH = `${PREFIX}/GET_APP_HEALTH`;
export const GET_APP_HEALTH_PENDING = `${GET_APP_HEALTH}_PENDING`;
export const GET_APP_HEALTH_FULFILLED = `${GET_APP_HEALTH}_FULFILLED`;
export const GET_APP_HEALTH_REJECTED = `${GET_APP_HEALTH}_REJECTED`;

export const GET_APP_INFO = `${PREFIX}/GET_APP_INFO`;
export const GET_APP_INFO_PENDING = `${GET_APP_INFO}_PENDING`;
export const GET_APP_INFO_FULFILLED = `${GET_APP_INFO}_FULFILLED`;
export const GET_APP_INFO_REJECTED = `${GET_APP_INFO}_REJECTED`;

export const GET_CONFIG_PROPS = `${PREFIX}/GET_CONFIG_PROPS`;
export const GET_CONFIG_PROPS_PENDING = `${GET_CONFIG_PROPS}_PENDING`;
export const GET_CONFIG_PROPS_FULFILLED = `${GET_CONFIG_PROPS}_FULFILLED`;
export const GET_CONFIG_PROPS_REJECTED = `${GET_CONFIG_PROPS}_REJECTED`;

export const CHANGE_TAB = `${PREFIX}/CHANGE_TAB`;


function loadComponent(baseUrl) {
  return dispatch => {
    dispatch(changeBaseUrl(baseUrl));
    dispatch(getAppInfo());
  };
}

const changeTab = createAction(CHANGE_TAB, tabName => {
  return {
    tabName,
  };
});

const changeBaseUrl = createAction(CHANGE_BASE_URL, baseUrl => {
  return {
    baseUrl,
  };
});

const createGetAppHealth = createAction(GET_APP_HEALTH, api.getHealth);

function getAppHealth() {
  return (dispatch, getState) => {
    const baseUrl = getState().springBoot.baseUrl;
    dispatch(createGetAppHealth(baseUrl));
  };
}

const createGetAppInfoAction = createAction(GET_APP_INFO, api.getInfo);

function getAppInfo() {
  return (dispatch, getState) => {
    const baseUrl = getState().springBoot.baseUrl;
    dispatch(createGetAppInfoAction(baseUrl));
  };
}

const createGetConfigProps = createAction(GET_CONFIG_PROPS, api.getConfigProps);

function getConfigProps() {
  return (dispatch, getState) => {
    const baseUrl = getState().springBoot.baseUrl;
    dispatch(createGetConfigProps(baseUrl));
  };
}

export {
  loadComponent,
  changeTab,
  changeBaseUrl,
  getAppHealth,
  getAppInfo,
  getConfigProps,
};
