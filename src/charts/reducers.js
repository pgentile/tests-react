import { range } from 'lodash-es';

import * as actions from './actions';


function generateRainbowColors(size, saturation = 1, lightness = 0.5) {
  return range(size).map(i => {
    const hue = Math.round(360 * (i / size)) % 360;
    return `hsl(${hue}, ${saturation * 100}%, ${lightness * 100}%)`;
  });
}


function generateData() {
  const generateNumber = () => Math.round(Math.random() * 100);
  const count = 10;
  const generateData = () => range(count).map(() => generateNumber());
  const generateBackgroundColors = (saturation, lightness) => generateRainbowColors(count, saturation, lightness);

  const labels = range(count).map(i => `Label ${i}`);

  const graphData = {
    labels,
    datasets: [
      {
        data: generateData(),
        backgroundColor: generateBackgroundColors(1, 0.5),
        hoverBackgroundColor: generateBackgroundColors(1, 0.8),
      },
      /*{
        data: generateData(),
        backgroundColor: generateBackgroundColors(0.6, 0.5),
        hoverBackgroundColor: generateBackgroundColors(1, 0.8),
      },*/
    ],
  };

  return graphData;
}


const DEFAULT_STATE = {
  data: generateData(),
  displayLegend: true,
};

export function charts(state = DEFAULT_STATE, action) {
  switch (action.type) {

  case actions.REFRESH_CHART:
    return {
      data: generateData(),
      displayLegend: state.displayLegend,
    };

  case actions.ENABLE_CHART_LEGEND:
    return {
      data: state.data,
      displayLegend: true,
    };

  case actions.DISABLE_CHART_LEGEND:
    return {
      data: state.data,
      displayLegend: false,
    };

  default:
    return state;

  }
}
