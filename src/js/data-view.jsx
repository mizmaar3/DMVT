import React, { Component } from 'react';
let Chart = require('react-google-charts').Chart;
import TableView from './data-table-view.jsx';

class Data extends Component{

  render() {
    let chartData = [];
    let chartOptions = null;
    let rows = [];
    let chartElement = null;
    if (this.props.perCampaignView) {
      rows.push(["Goals", "Total Impression", "Avg. Impression /day"])
      Object.keys(this.props.data).forEach( (key) => {
          let averagePerDay = Math.round(this.props.data[key]["imp"]/this.props.data[key]["days"]);
          rows.push([key, this.props.data[key]["imp"], averagePerDay]);
      });
    } else {
      chartData = [["Date", "Number of Impressions"]];
      Object.keys(this.props.data).forEach( (key) => {
          chartData.push([key, this.props.data[key]])
      });
      chartOptions = {
          title: this.props.title,
          backgroundColor: {
            fill: "#ebebeb",
            stroke: '#cccccc',
            strokeWidth: 3
          }
      };
    }

    if (Object.keys(this.props.data).length > 0) {
      if (this.props.perCampaignView) {
        return (
          <TableView
            title={this.props.title}
            rows={rows}
            width={"700px"} />
          )
      } else {
        return (
          <Chart
            chartType={"ColumnChart"}
            data={chartData}
            options={chartOptions}
            width={"700px"}
            height={"400px"}
            legend_toggle={true} />
          )
      }
    }

    return (
			<div>{chartElement}</div>
		);
	}
}

export default Data;
