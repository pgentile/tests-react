import React from 'react';
import Chart from 'chart.js';
import { PageComponent } from '../page/components';
import { Row, Column, Button } from 'react-foundation';


export class BaseChartComponent extends React.Component {

  constructor(props) {
    super(props);
    this.canvas = null;
    this.chart = null;
  }

  componentDidMount() {
    if (this.props.data !== null) {
      this.initChart();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      if (this.props.data === null) {
        if (this.chart !== null) {
          this.destroyChart();
        }
      } else {
        if (this.chart === null) {
          this.initChart();
        } else {
          this.updateChart();
        }
      }
    }
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    const referenceCanvas = element => this.canvas = element;

    return (
      <canvas ref={referenceCanvas} width={400} height={250}></canvas>
    )
  }

  initChart() {
    this.chart = new Chart(this.canvas, {
      type: this.props.type,
      data: this.props.data,
      options: this.props.options,
    });
  }

  updateChart() {
    this.chart.data.labels = this.props.data.labels;
    this.chart.data.datasets = this.props.data.datasets;
    this.chart.update();
  }

  destroyChart() {
    this.chart.destroy();
    this.chart = null;
  }

}

BaseChartComponent.propTypes = {
  data: React.PropTypes.object,
  options: React.PropTypes.object,
  type: React.PropTypes.string.isRequired,
};


export function PieChart(props) {
  const realProps = Object.assign({}, { type: 'pie' }, props);
  return <BaseChartComponent {...realProps}/>;
}


export class ChartsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
  }

  refreshData(event) {
    event.preventDefault();
    this.props.onRefresh();
  }

  render() {
    return (
      <PageComponent title="Charts">
        <Row>
          <Column large={4}>
            <PieChart data={this.props.data}/>
          </Column>
          <Column large={4}>
            <PieChart data={this.props.data}/>
          </Column>
          <Column large={4}>
            <PieChart data={this.props.data}/>
          </Column>
        </Row>
        <Row>
          <Column>
            <Button onClick={this.refreshData}>Refresh data</Button>
          </Column>
        </Row>
      </PageComponent>
    );
  }

}

ChartsComponent.propTypes = {
  data: React.PropTypes.object.isRequired,
  onRefresh: React.PropTypes.func.isRequired,
};
