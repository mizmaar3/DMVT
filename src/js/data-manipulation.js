let React = require('react');
let ReactDOM = require('react-dom');
let C = require('./constants.js');

let DataManipulation = {
  getCampaignItems() {
    /**
    * Returns all available campaigns names from dataset
    *
    * @return {Array}
    **/
     if (this.dataset) {
       return this.dataset[C.dataSetName].map((item) => {
         return item.name;
       });
     }
     return [];
  },
  getGoalItems() {
    /**
    * Returns all campaign's goals names from selected campaign
    *
    * @return {Array}
    **/
     if (this.dataset) {
       return this.dataset[C.dataSetName].filter((item) => {
         return item.name === this.state.campaign;
       })[0]["goals"].map((item) => {
         return item.name;
       });
     }
     return [];
  },
  sortedDataByDay(data) {
    /**
    * This function will sorts the object data
    * it will sort out data by Dates
    *
    * @param {Object} with key as date and value as total impression
    * @return {Object} with key as date and value as total impression
    **/
    let sortable = [];
    for (let key in data) {
      sortable.push([ key, data[key] ]);
    }
    sortable.sort( (a,b) => {
        return Number(a[0].split("-")[2]) - Number(b[0].split("-")[2])
    });

    let sorted = {};
    sortable.map((item) => {
      sorted[item[0]] = item[1];
      return sorted;
    });
    return sorted;
  },
  accumulatedDataPerDay() {
    /**
    * It sum up the data for each day
    * of selected goal of selected campaign
    *
    * @return {Object} with key as date and value as total impression
    **/
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

      return this.sortedDataByDay(sum);
    }
    return {};
  },
  accumulatedDataPerCampaign() {
    /**
    * It sum up the data for each goal of selected campaign
    * it will show up in a table view
    *
    * @return {Array}
    **/
    if(this.state.campaign) {
      let sum = {};
      let totals = [];
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

    return [];
  }
};

module.exports = DataManipulation;
