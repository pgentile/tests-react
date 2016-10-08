import React from 'react';
import Chart from 'chart.js';
import { PageComponent } from '../page/components';
import { Row, Column, Button } from 'react-foundation';


export class BaseChartComponent extends React.Component {

  constructor(props) {
    super(props);
    this.canvas = null;
    this.chart = null;

    this.setCanvas = this.setCanvas.bind(this);
  }

  componentDidMount() {
    if (this.props.data !== null) {
      this.initChart();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type || prevProps.options !== this.props.options) {
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
      <canvas ref={this.setCanvas} width={400} height={250}></canvas>
    )
  }

  setCanvas(canvas) {
    this.canvas = canvas;
  }

  initChart() {
    this.destroyChart();

    this.chart = new Chart(this.canvas, {
      type: this.props.type,
      data: this.props.data,
      options: this.props.options,
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

BaseChartComponent.propTypes = {
  data: React.PropTypes.object.isRequired,
  options: React.PropTypes.object,
  type: React.PropTypes.string.isRequired,
};


export function PieChart(props) {
  const realProps = Object.assign({}, { type: 'pie' }, props);
  return <BaseChartComponent {...realProps}/>;
}


export function DoughnutChart(props) {
  const realProps = Object.assign({}, { type: 'doughnut' }, props);
  return <BaseChartComponent {...realProps}/>;
}


export function BarChart(props) {
  const realProps = Object.assign({}, { type: 'bar' }, props);
  return <BaseChartComponent {...realProps}/>;
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
        <Column large={4}>
          <PieChart data={data} options={options}/>
        </Column>
        <Column large={4}>
          <BarChart data={data} options={options}/>
        </Column>
        <Column large={4}>
          <DoughnutChart data={data} options={options}/>
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
  data: React.PropTypes.object.isRequired,
  displayLegend: React.PropTypes.bool.isRequired,
  onRefresh: React.PropTypes.func.isRequired,
  onEnableLegend: React.PropTypes.func.isRequired,
  onDisableLegend: React.PropTypes.func.isRequired,
};
