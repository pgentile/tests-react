import { createAction } from 'redux-actions';

import * as api from './api';

const PREFIX = 'springBoot';

export const CHANGE_BASE_URL = `${PREFIX}/CHANGE_BASE_URL`;
export const UPDATE_METRIC_NAME_FILTER = `${PREFIX}/UPDATE_METRIC_NAME_FILTER`;
export const UPDATE_ENV_FILTER = `${PREFIX}/UPDATE_ENV_FILTER`;

export const GET_APP_HEALTH = `${PREFIX}/GET_APP_HEALTH`;
export const GET_APP_HEALTH_FULFILLED = `${GET_APP_HEALTH}_FULFILLED`;
export const GET_APP_HEALTH_REJECTED = `${GET_APP_HEALTH}_REJECTED`;

export const GET_APP_INFO = `${PREFIX}/GET_APP_INFO`;
export const GET_APP_INFO_FULFILLED = `${GET_APP_INFO}_FULFILLED`;
export const GET_APP_INFO_REJECTED = `${GET_APP_INFO}_REJECTED`;

export const GET_CONFIG_PROPS = `${PREFIX}/GET_CONFIG_PROPS`;
export const GET_CONFIG_PROPS_FULFILLED = `${GET_CONFIG_PROPS}_FULFILLED`;
export const GET_CONFIG_PROPS_REJECTED = `${GET_CONFIG_PROPS}_REJECTED`;

export const GET_METRICS = `${PREFIX}/GET_METRICS`;
export const GET_METRICS_FULFILLED = `${GET_METRICS}_FULFILLED`;
export const GET_METRICS_REJECTED = `${GET_METRICS}_REJECTED`;

export const GET_ENV = `${PREFIX}/GET_ENV`;
export const GET_ENV_FULFILLED = `${GET_ENV}_FULFILLED`;
export const GET_ENV_REJECTED = `${GET_ENV}_REJECTED`;

export const CHANGE_TAB = `${PREFIX}/CHANGE_TAB`;


function loadComponent(baseUrl) {
  return dispatch => {
    dispatch(changeBaseUrl(baseUrl));
    return dispatch(getAppInfo());
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
    return dispatch(createGetAppHealth(baseUrl));
  };
}

const createGetAppInfoAction = createAction(GET_APP_INFO, api.getInfo);

function getAppInfo() {
  return (dispatch, getState) => {
    const baseUrl = getState().springBoot.baseUrl;
    return dispatch(createGetAppInfoAction(baseUrl));
  };
}

const createGetConfigPropsAction = createAction(GET_CONFIG_PROPS, api.getConfigProps);

function getConfigProps() {
  return (dispatch, getState) => {
    const baseUrl = getState().springBoot.baseUrl;
    return dispatch(createGetConfigPropsAction(baseUrl));
  };
}

const createGetMetricsAction = createAction(GET_METRICS, api.getMetrics);

function getMetrics() {
  return (dispatch, getState) => {
    const baseUrl = getState().springBoot.baseUrl;
    return dispatch(createGetMetricsAction(baseUrl));
  };
}

const updateMetricNameFilter = createAction(UPDATE_METRIC_NAME_FILTER, metricNameFilter => {
  return {
    metricNameFilter,
  };
});

const updateEnvFilter = createAction(UPDATE_ENV_FILTER, envFilter => {
  return {
    envFilter,
  };
});

const createGetEnvAction = createAction(GET_ENV, api.getEnv);

function getEnv() {
  return (dispatch, getState) => {
    const baseUrl = getState().springBoot.baseUrl;
    return dispatch(createGetEnvAction(baseUrl));
  };
}

export {
  loadComponent,
  changeTab,
  changeBaseUrl,
  getAppHealth,
  getAppInfo,
  getMetrics,
  getConfigProps,
  getEnv,
  updateMetricNameFilter,
  updateEnvFilter,
};
