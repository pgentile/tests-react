import _ from 'lodash';

import * as actions from './actions';


function generateRainbowColors(size, saturation = 1, lightness = 0.5) {
  return _.range(size).map(i => {
    const hue = Math.round(360 * (i / size)) % 360;
    return `hsl(${hue}, ${saturation * 100}%, ${lightness * 100}%)`;
  });
}


function generateData() {
  const generateNumber = () => Math.round(Math.random() * 100);

  const count = 15;
  const labels = _.range(count).map(i => `Label ${i}`);
  const data = _.range(count).map(() => generateNumber());
  const backgroundColor = generateRainbowColors(count, 1, 0.5);
  const hoverBackgroundColor = generateRainbowColors(count, 1, 0.8);

  const graphData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        hoverBackgroundColor,
      },
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
