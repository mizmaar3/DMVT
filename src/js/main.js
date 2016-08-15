let React = require('react');
let ReactDOM = require('react-dom');
let Dropdown = require('../common-ui/dropdown.jsx');
let DataView = require('./data-view.jsx');
let HttpRequest = require('./http-request.js');
let C = require('./constants.js');
let WelcomeContent = require('./welcome-content.jsx');
let DataManipulation = require('./data-manipulation.js');

let Main = React.createClass({
  mixins: [DataManipulation],
  getInitialState(){
    return {
      loading: true,
      campaign: false,
      goal: false
    }
  },
  componentDidMount(){
    this.setData();
  },
  setData() {
    /**
    * Set data once using xmlHttp promose
    **/
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
  _onCampaignChange(value) {
    this.setState({
      campaign: value !== "false" ? value : false,
      goal: value !== "false" ? this.state.goal : false
    });
  },
  _onGoalChange(value) {
    this.setState({
      goal: value !== "false" ? value : false
    });
  },
  render() {
    let campaignItems = this.getCampaignItems() || [];
    let goalItems = this.state.campaign ? this.getGoalItems() : [];
    let perCampaignView = this.state.campaign && !this.state.goal ? true : false;
    let dataForDataView = perCampaignView ? this.accumulatedDataPerCampaign() : this.accumulatedDataPerDay();
    let dataViewTitle = perCampaignView ? this.state.campaign +" Details" : this.state.campaign +"'s "+ this.state.goal + " impressions per day";

    return (
      <div >

        <h1>{C.pageTitle}</h1>

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

        <WelcomeContent show={this.state.campaign === false} />

        <DataView
          title={dataViewTitle}
          data={dataForDataView}
          perCampaignView={perCampaignView} />
      </div>
    )
  }
});

ReactDOM.render(<Main />, document.getElementById("main"));
