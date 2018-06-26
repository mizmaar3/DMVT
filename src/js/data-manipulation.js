import React from 'react';
import ReactDOM from 'react-dom';
import Constants from './constants.js';

let DataManipulation = {
  getCampaignItems(dataset) {
    /**
    * Returns all available campaigns names from dataset
    *
    * @return {Array}
    **/
     if (dataset) {
       return dataset[Constants.dataSetName].map((item) => {
         return item.name;
       })
     }
     return [];
  },
  getGoalItems(dataset, campaign) {
    /**
    * Returns all campaign's goals names from selected campaign
    *
    * @return {Array}
    **/
     if (dataset) {
       return dataset[Constants.dataSetName].filter((item) => {
         return item.name === campaign;
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
        return (new Date(a[0])) - (new Date(b[0]))
    });

    let sorted = {};
    sortable.map((item) => {
      sorted[item[0]] = item[1];
      return sorted;
    });
    return sorted;
  },
  accumulatedDataPerDay(dataset, campaign, goal) {
    /**
    * It sum up the data for each day
    * of selected goal of selected campaign
    *
    * @return {Object} with key as date and value as total impression
    **/
    if(campaign && goal) {
      let sum = new Object();
      let selectedGroup = dataset[Constants.dataSetName].filter((item) => {
       return item.name === campaign
      })[0].goals.filter((item) => {
        return item.name === goal
      })[0].data;

      Object.keys(selectedGroup).forEach( (key) => {
        let perDateKey = key.split(".")[0];
        sum[perDateKey] = (sum[perDateKey] ?  sum[perDateKey] + selectedGroup[key] : selectedGroup[key]);
      });

      return DataManipulation.sortedDataByDay(sum);
    }
    return {};
  },
  accumulatedDataPerCampaign(dataset, campaign) {
    /**
    * It sum up the data for each goal of selected campaign
    * it will show up in a table view
    *
    * @return {Array}
    **/
    if(campaign) {
      let sum = {};
      let totals = [];
      let selectedCampaignGoals = dataset[Constants.dataSetName].filter((item) => {
        return item.name === campaign
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

export default DataManipulation;
