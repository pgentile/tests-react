import * as actions from './actions';


function generateData() {
  const generateNumber = () => Math.round(Math.random() * 100);

  return {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [
      {
        data: [
          generateNumber(),
          generateNumber(),
          generateNumber(),
        ],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      },
    ]
  };
}


const DEFAULT_STATE = {
  data: generateData(),
};

export function charts(state = DEFAULT_STATE, action) {
  switch (action.type) {

  case actions.REFRESH_CHART:
    return {
      data: generateData(),
    };

  default:
    return state;

  }
}
