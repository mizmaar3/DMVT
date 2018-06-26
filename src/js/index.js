import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Dropdown from '../common-ui/dropdown.jsx';
import DataView from './data-view.jsx';
import HttpRequest from './http-request.js';
import Constants from './constants.js';
import WelcomeContent from './welcome-content.jsx';
import DataManipulation from './data-manipulation.js';
import '../less/main.less';

class Main extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      campaign: false,
      goal: false
    };

    this.setData = this.setData.bind(this);
    this._onCampaignChange = this._onCampaignChange.bind(this);
    this._onGoalChange = this._onGoalChange.bind(this);
  }

  componentDidMount(){
    this.setData();
  }

  setData() {
    /**
    * Set data once using xmlHttp promose
    **/
    if(!this.dataset) {
      HttpRequest('GET', Constants.dataEndPoint)
        .then((data) => {
          this.dataset = data;
          this.setState({
            loading: false
          });
        });
    }
  }

  _onCampaignChange(value) {
    this.setState({
      campaign: value !== "false" ? value : false,
      goal: value !== "false" ? this.state.goal : false
    });
  }

  _onGoalChange(value) {
    this.setState({
      goal: value !== "false" ? value : false
    });
  }

  render() {
    let campaignItems = DataManipulation.getCampaignItems(this.dataset) || [];
    let goalItems = this.state.campaign ? DataManipulation.getGoalItems(this.dataset, this.state.campaign) : [];
    let perCampaignView = this.state.campaign && !this.state.goal ? true : false;
    let dataForDataView = perCampaignView ? DataManipulation.accumulatedDataPerCampaign(this.dataset, this.state.campaign) : DataManipulation.accumulatedDataPerDay(this.dataset, this.state.campaign, this.state.goal);
    let dataViewTitle = perCampaignView ? this.state.campaign +" Details" : this.state.campaign +"'s "+ this.state.goal + " impressions per day";

    return (
      <div >

        <h1>{Constants.pageTitle}</h1>

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
}

ReactDOM.render(<Main />, document.getElementById("main"));
