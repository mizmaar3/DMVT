let React = require('react');
let Chart = require('react-google-charts').Chart;
let TableView = require('./data-table-view.jsx');

let Data = React.createClass({

  render() {
    let chartData = [];
    let chartOptions = null;
    let rows = [];
    let chartElement = null;
    if (this.props.perCampaignView) {
      rows.push(["Goals", "Total Impression", "Impression /day"])
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
});

module.exports = Data;
