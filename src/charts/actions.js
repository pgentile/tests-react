export const REFRESH_CHART = 'REFRESH_CHART';
export const ENABLE_CHART_LEGEND = 'ENABLE_CHART_LEGEND';
export const DISABLE_CHART_LEGEND = 'DISABLE_CHART_LEGEND';


export function refreshChart() {
  return {
    type: REFRESH_CHART,
  };
}

export function enableChartLegend() {
  return {
    type: ENABLE_CHART_LEGEND,
  };
}

export function disableChartLegend() {
  return {
    type: DISABLE_CHART_LEGEND,
  };
}
