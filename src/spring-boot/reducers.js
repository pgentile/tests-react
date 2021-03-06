import * as actions from './actions';


const SPRING_DEFAULT_STATE = {
  health: null,
  info: null,
  configProps: null,
  metrics: null,
  env: null,
};

const APPLICATION_DEFAULT_STATE = {
  baseUrl: 'http://localhost:8080/system',
  currentTab: 'health',
  metricNameFilter: '',
  envFilter: '',
  ...SPRING_DEFAULT_STATE,
};


export function springBoot(state = APPLICATION_DEFAULT_STATE, action) {
  switch (action.type) {

  case actions.CHANGE_BASE_URL:
    return {
      ...state,
      ...SPRING_DEFAULT_STATE,
      baseUrl: action.payload.baseUrl,
    };

  case actions.GET_APP_INFO_FULFILLED:
    return {
      ...state,
      info: action.payload,
    };

  case actions.GET_APP_INFO_REJECTED:
    return {
      ...state,
      info: null,
    };

  case actions.GET_APP_HEALTH_FULFILLED:
    return {
      ...state,
      health: action.payload,
    };

  case actions.GET_APP_HEALTH_REJECTED:
    return {
      ...state,
      health: null,
    };

  case actions.GET_CONFIG_PROPS_FULFILLED:
    return {
      ...state,
      configProps: action.payload,
    };

  case actions.GET_CONFIG_PROPS_REJECTED:
    return {
      ...state,
      configProps: null,
    };

  case actions.GET_METRICS_FULFILLED:
    return {
      ...state,
      metrics: computeMetricsDelta(state.metrics, action.payload),
    };

  case actions.GET_METRICS_REJECTED:
    return {
      ...state,
      metrics: null,
    };

  case actions.GET_ENV_FULFILLED:
    return {
      ...state,
      env: action.payload,
    };

  case actions.GET_ENV_REJECTED:
    return {
      ...state,
      env: null,
    };

  case actions.CHANGE_TAB:
    if (action.payload.tabName === state.currentTab) {
      return state;
    }
    return {
      ...state,
      currentTab: action.payload.tabName,
    };

  case actions.UPDATE_METRIC_NAME_FILTER:
    if (action.payload.metricNameFilter === state.metricNameFilter) {
      return state;
    }
    return {
      ...state,
      metricNameFilter: action.payload.metricNameFilter,
    };

  case actions.UPDATE_ENV_FILTER:
    if (action.payload.envFilter === state.envFilter) {
      return state;
    }
    return {
      ...state,
      envFilter: action.payload.envFilter,
    };

  default:
    return state;

  }
}


function computeMetricsDelta(oldMetrics, newMetrics) {
  if (oldMetrics) {
    newMetrics.forEach(newMetric => {
      const oldMetricIndex = oldMetrics.findIndex(metric => metric.name === newMetric.name);
      if (oldMetricIndex >= 0) {
        const oldMetric = oldMetrics[oldMetricIndex];
        const delta = newMetric.value - oldMetric.value;
        newMetric.delta = delta;
      }
    });
  }

  return newMetrics;
}
