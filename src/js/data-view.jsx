import React from 'react';
import { Chart } from 'react-google-charts';
import TableView from './data-table-view.jsx';
import PropTypes from "prop-types";


const Data = ({title, data, perCampaignView}) => {

  let chartData = [];
  let chartOptions = null;
  let rows = [];
  let chartElement = null;

  if (perCampaignView) {
    rows.push(["Goals", "Total Impression", "Avg. Impression /day"])
    Object.keys(data).forEach( (key) => {
        let averagePerDay = Math.round(data[key]["imp"]/data[key]["days"]);
        rows.push([key, data[key]["imp"], averagePerDay]);
    });
  } else {
    chartData = [["Date", "Number of Impressions"]];
    Object.keys(data).forEach( (key) => {
        chartData.push([key, data[key]])
    });
    chartOptions = {
      title,
      backgroundColor: {
        fill: "#ebebeb",
        stroke: '#cccccc',
        strokeWidth: 3
      }
    };
  }

  if (Object.keys(data).length > 0) {
    if (perCampaignView) {
      return (
        <TableView
          title={title}
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

  return (<div>{chartElement}</div>)

};

Data.propTypes = {
  title: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  perCampaignView: PropTypes.bool
};

export default Data;
