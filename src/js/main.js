let React = require('react');
let ReactDOM = require('react-dom');
let Dropdown = require('../common-ui/dropdown.jsx');
let DataView = require('./data-view.jsx');
let HttpRequest = require('./http-request.js');
let C = require('./constants.js');

let App = React.createClass({
  getInitialState(){
    return {
      loading: true,
      campaign: null,
      goal: null
    }
  },
  componentDidMount(){
    top.app = this;
    this.setData();
  },
  setData() {
    if(!this.dataset) {
      HttpRequest('GET', C.dataEndPoint)
        .then((data) => {
          this.dataset = data;
          this.setState({
            loading: false
          });
        });
    }
  },
  getCampaignItems() {
     if (this.dataset) {
       return this.dataset[C.dataSetName].map((item) => {
         return item.name;
       });
     }
     return [];
  },
  getGoalItems() {
     if (this.dataset) {
       return this.dataset[C.dataSetName].filter((item) => {
         return item.name === this.state.campaign;
       })[0]["goals"].map((item) => {
         return item.name;
       });
     }
     return [];
  },
  accumulatedDataPerDay() {
    if(this.state.campaign && this.state.goal) {
      let sum = new Object();
      let selectedGroup = this.dataset[C.dataSetName].filter((item) => {
       return item.name === this.state.campaign
      })[0].goals.filter((item) => {
        return item.name === this.state.goal
      })[0].data;

      Object.keys(selectedGroup).forEach( (key) => {
        let perDateKey = key.split(".")[0];
        sum[perDateKey] = (sum[perDateKey] ?  sum[perDateKey] + selectedGroup[key] : selectedGroup[key]);
      });

      return sum;
    }
    return {};
  },
  accumulatedDataPerCampaign() {
    if(this.state.campaign) {
      let sum = {};
      let totals = {};
      let selectedCampaignGoals = this.dataset[C.dataSetName].filter((item) => {
        return item.name === this.state.campaign
      })[0].goals.map((item) => {
        sum[item.name] = sum[item.name] || {};
        Object.keys(item.data).forEach((key) => {
          let perDateKey = key.split(".")[0];
          sum[item.name][perDateKey] = (sum[item.name][perDateKey] ? sum[item.name][perDateKey] + item.data[key] : item.data[key]);
        });
      });

      Object.keys(sum).forEach((key, i) => {
       totals[key] = totals[key] || {};
       Object.keys(sum[key]).forEach((_key, i) => {
         totals[key]['imp'] = (totals[key]['imp'] ? totals[key]['imp'] + sum[key][_key] : sum[key][_key]);
         totals[key]['days'] = 1+i;
       });
      });
      return totals;
    }

    return {};
  },
  _onCampaignChange(value) {
    let newSate = {
      campaign: value !== "false" ? value : false,
      goal: value !== "false" ? this.state.goal : false
    };
    this.setState(newSate);
  },
  _onGoalChange(value) {
    this.setState({
      goal: value !== "false" ? value : false
    });
  },
  render() {
    let containerClass = this.state.loading ? "hide" : "show";
    let campaignItems = this.getCampaignItems() || [];
    let goalItems = this.state.campaign ? this.getGoalItems() : [];
    let perCampaignView = this.state.campaign && !this.state.goal ? true : false;
    let dataForDataView = perCampaignView ? this.accumulatedDataPerCampaign() : this.accumulatedDataPerDay();
    let dataViewTitle = perCampaignView ? this.state.campaign +" Details" : this.state.campaign +"'s "+ this.state.goal + " impressions per day";

    return (
      <div className={containerClass}>
        <h1>C.pageTitle</h1>
        <Dropdown
          type="select"
          items={campaignItems}
          onChange={this._onCampaignChange}
          label="SELECT A CAMPAIGN"
        />

        <Dropdown
          type="select"
          items={goalItems}
          onChange={this._onGoalChange}
          label="SELECT A GOAL"
        />

        <DataView
          title={dataViewTitle}
          data={dataForDataView}
          perCampaignView={perCampaignView} />
      </div>
    )
  }
});

ReactDOM.render(<App />, document.getElementById("main"));
