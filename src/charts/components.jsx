import PropTypes from 'prop-types';
import React from 'react';
import Chart from 'chart.js';
import { Row, Column, Button } from 'react-foundation';
import { cloneDeep } from 'lodash-es';

import { PageComponent } from '../page/components';


class BaseChartComponent extends React.Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    options: PropTypes.object,
  };

  constructor(type, props) {
    super(props);
    this.type = type;
    this.canvas = null;
    this.chart = null;
  }

  componentDidMount() {
    if (this.props.data !== null) {
      this.initChart();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.options !== this.props.options) {
      this.initChart();
    } else if (prevProps.data !== this.props.data) {
      this.updateChart();
    }
  }

  componentWillUnmount() {
    this.destroyChart();
  }

  render() {
    return (
      <canvas ref={this.setCanvas} width={400} height={250} />
    );
  }

  setCanvas = (canvas) => {
    this.canvas = canvas;
  };

  initChart() {
    this.destroyChart();

    // Charts.js alters our objects, we must clone...
    let { data, options } = this.props;
    data = cloneDeep(data);
    options = options ? cloneDeep(options) : undefined;

    this.chart = new Chart(this.canvas, {
      type: this.type,
      data,
      options,
    });
  }

  updateChart() {
    if (this.chart === null) {
      this.initChart();
    } else {
      this.chart.data.labels = this.props.data.labels;
      this.chart.data.datasets = this.props.data.datasets;
      this.chart.update();
    }
  }

  destroyChart() {
    if (this.chart !== null) {
      this.chart.destroy();
      this.chart = null;
    }
  }

}

export class PieChart extends BaseChartComponent {

  constructor(props) {
    super('pie', props);
  }

}


export class DoughnutChart extends BaseChartComponent {

  constructor(props) {
    super('doughnut', props);
  }

}


export class BarChart extends BaseChartComponent {

  constructor(props) {
    super('bar', props);
  }

}


export class PolarChart extends BaseChartComponent {

  constructor(props) {
    super('polarArea', props);
  }

}


export function ChartsComponent({ data, displayLegend, onRefresh, onEnableLegend, onDisableLegend }) {
  const options = {
    legend: {
      display: displayLegend,
    },
  };

  const onRefreshClick = event => {
    event.preventDefault();
    onRefresh();
  };

  const onToggleLegendClick = event => {
    event.preventDefault();
    if (displayLegend) {
      onDisableLegend();
    } else {
      onEnableLegend();
    }
  };

  return (
    <PageComponent title="Charts">
      <Row>
        <Column large={6}>
          <PieChart data={data} options={options} />
        </Column>
        <Column large={6}>
          <BarChart data={data} options={options} />
        </Column>
      </Row>
      <Row>
        <Column large={6}>
          <BarChart data={data} options={options} />
        </Column>
        <Column large={6}>
          <PolarChart data={data} options={options} />
        </Column>
      </Row>
      <Row>
        <Column>
          <Button onClick={onRefreshClick}>Refresh data</Button>
          <Button onClick={onToggleLegendClick}>Toggle legend</Button>
        </Column>
      </Row>
    </PageComponent>
  );
}

ChartsComponent.propTypes = {
  data: PropTypes.object.isRequired,
  displayLegend: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  onEnableLegend: PropTypes.func.isRequired,
  onDisableLegend: PropTypes.func.isRequired,
};
