import React, { Component } from 'react';
var LineChart = require("react-chartjs").Line;

/*
 *
 * REFACTORING RECOMMENDATION
 *
 * Graph changes currently structured based on several hardcoded functions.
 *  - once file refactored to pass in props, recommend collapsing these to one func
 *  - the one func takes in a single value that will trigger a switch statement that selects props
 *  - use the keys
 *
 *
 */

export default class DataGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLabels: [1, 2, 3, 4],
      graphLabel: "One Day",
      data: [4, 1, 2, 6]
    };

  }

  UpdateOneDay = () => {
    this.setState(state => ({
      dataLabels: [1, 2, 3, 4],
      graphLabel: "One Day",
      data: [4, 1, 2, 6]
    }));
  }

  UpdateOneWeek = () => {
    this.setState(state => ({
      dataLabels: [1, 2, 3, 4, 5, 6, 7],
      graphLabel: "One Week",
      data: [4, 4, 1, 2, 2, 5, 7]
    }));
  }

  UpdateThreeMonth= () => {
    this.setState(state => ({
      dataLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      graphLabel: "Three Month",
      data: [4, 4, 1, 2, 2, 5, 7, 8, 9, 13, 4, 12, 5, 2, 31, 5]
    }));
  }

  UpdateOneMonth = () => {
    this.setState(state => ({
      dataLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      graphLabel: "One Month",
      data: [4, 4, 1, 2, 2, 5, 7, 8, 9, 13, 4]
    }));
  }

  UpdateOneYear = () => {
    this.setState(state => ({
      dataLabels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
      graphLabel: "One Year",
      data: Array.from(Array(25).keys())
    }));
  }

  UpdateAll = () => {
    this.setState(state => ({
      dataLabels: Array.from(Array(40).keys()),
      graphLabel: "All",
      data: Array.from(Array(40).keys())
    }));
  }

  render() {
    var chartOptions = {
      scaleShowHorizontalLines: true
    };

    var generalData = {
      labels: this.state.dataLabels,
      datasets: [
        {
          label: this.state.graphLabel,
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: this.state.data
        }
      ]
    }

    return (
      <div>
        <LineChart data={generalData} options={chartOptions} width="600" height="250"/>
        <div className="quickstart row">
          {this.state.graphLabel}
        </div>
        <div className="quickstart row">
          <button key={"oneday"} onClick={this.UpdateOneDay}>1D</button>
          <button key={"oneweek"} onClick={this.UpdateOneWeek}>1W</button>
          <button key={"onemonth"} onClick={this.UpdateOneMonth}>M</button>
          <button key={"threemonth"} onClick={this.UpdateThreeMonth}>3M</button>
          <button key={"oneyear"} onClick={this.UpdateOneYear}>1Y</button>
          <button key={"all"} onClick={this.UpdateAll}>ALL</button>
        </div>
      </div>
    );
  }
}
