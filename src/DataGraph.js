import React, { Component } from 'react';

var LineChart = require("react-chartjs").Line;

export default class DataGraph extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var chartOptions = {
      scaleShowHorizontalLines: true
    };

    var ThreeMonthChartData= {
      labels: ["January", "February", "March"],
      datasets: [
        {
          label: "3 Months",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 80]
        }
      ]
    };

    return (
      <div>
        <LineChart data={ThreeMonthChartData} options={chartOptions} width="600" height="250"/>
        <div className="quickstart row">
          <button>1D</button>
          <button>1W</button>
          <button>1M</button>
          <button>3M</button>
          <button>1Y</button>
          <button>ALL</button>
        </div>
      </div>
    );
  }
}
