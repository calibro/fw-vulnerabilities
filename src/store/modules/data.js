import * as d3 from "d3";
import { groups } from "d3-array";
import Vue from "vue";
import _ from "underscore";

const mandatoryCols = [
  "Code",
  "State",
  "Priority"
];

const filterCols = [
  {
    key: "Real Target",
    type: "group-list"
  },
  {
    key: "CVSS Score",
    type: 'range'
  },
  {
    key: "Priority",
    type: 'checkbox'
  },
  {
    key: "State",
    type: 'checkbox'
  },
  {
    key: "Close Code",
    type: 'checkbox'
  },
  {
    key: "Team Aziendale",
    type: 'checkbox'
  },
  {
    key: "Year",
    type: 'checkbox'
  },
  {
    key: "Esposizione",
    type: 'checkbox',
    multiple: true
  },
];

export default {
  namespaced: true,
  state: {
    loaded: false,
    fetchingData: false,
    firstLoad: true,
    dataError: "",
    csvData: [],
    selectedDataSource: {
      localFile: null,
      remoteFileUrl: null
    },
    filters: {},
    filterOptions: {}
  },
  getters: {
    filteredData: state => {
      let fData = state.csvData

      Object.keys(state.filters).forEach(filterKey => {
        let filterCol = filterCols.find(el => el.key == filterKey)
        if(filterCol.type == 'checkbox'){
          if(filterCol.multiple){
            fData = fData.filter(e => _.intersection(state.filters[filterKey], e[filterKey]).length > 0)

          } else {
            fData = fData.filter(e => state.filters[filterKey].includes(e[filterKey]))
          }
        }
        else if(filterCol.type == 'range'){
          fData = fData.filter(e => state.filters[filterKey][0] <= e[filterKey] && state.filters[filterKey][1] >= e[filterKey])
        }
        else if (filterCol.type == 'group-list'){
          fData = fData.filter(e => state.filters[filterKey].includes(String(e[filterKey])))
        }
      })
      return fData
    }
  },
  mutations: {
    setData(state, data) {
      state.fetchingData = false;
      if (_.every(mandatoryCols, c => data.columns.includes(c))) {
        state.csvData = data;
        state.firstLoad = false;
        state.loaded = true;

        // Fill missing data and columns
        data.forEach(d => {
          filterCols.forEach(col => {
            if(col.type == 'checkbox') {
              d[col.key] = d[col.key] ? d[col.key] : 'N/A'
            }
          })

          //remove string spaces and split values
          let str = d['Esposizione'].replace(/\s/g, '');
           d['Esposizione'] = str.split(',')

          // Add SLA values
          if (d['Age'] < 90) {
            d['Sla'] = "< 3"
          } else if (d['Age'] >= 90 && d['Age'] < 180) {
            d['Sla'] = "3"
          } else if (d['Age'] >=180 && d['Age'] < 365) {
            d['Sla'] = "6"
          } else if (d['Age'] > 365) {
            d['Sla'] = "> 12"
          }
        })

        // Dynamically fill filters option and values based on map
        filterCols.forEach(filterCol => {
          let fOptions = []
          if (filterCol.type == 'checkbox'){
            let cVals = []
            if (filterCol.multiple) {
              cVals = [...new Set(_.flatten(data.map(x => x[filterCol.key])))]
            } else {
              cVals = [...new Set(data.map(x => x[filterCol.key]))]
            }
            fOptions = cVals.filter(e => e).sort(
              (a, b) => a - b
            )
          }
          else if (filterCol.type == 'range'){
            let rangeVals = data.map(x => parseFloat(x[filterCol.key]));
            fOptions = [
              Math.min(...rangeVals),
              Math.max(...rangeVals)
            ];
          }
          else if (filterCol.type == 'group-list'){
            fOptions = Object.keys(_.groupBy(data, d => d[filterCol.key]))
          }
          Vue.set(state.filterOptions, filterCol.key, fOptions.slice())
          Vue.set(state.filters, filterCol.key, fOptions.slice())
        })
      } else {
        state.csvData = [];
        state.hierarchy = [];
        state.dataError = "Wrong CSV format.";
      }
    },
    setFilterValue(state, filter) {
      Vue.set(state.filters, filter.filterKey, filter.val);
    },
    setExcludeNodes(state, val) {
      Vue.set(state.filters, "excludeNodes", val);
    },
    setDataError(state, error) {
      state.loaded = false;
      state.fetchingData = false;
      state.dataError = error;
    },
    resetFilters(state) {
      let resetFilters = Object.assign({}, state.filterOptions);
      Vue.set(state, 'filters', Object.assign({}, resetFilters))
    }
  },
  actions: {
    async loadTestData({ state, commit }) {
      state.loaded = false;
      state.fetchingData = true;
      const csvData = await d3
        .csv("./data/test.csv", d3.autoType)
        .catch(err => commit("setDataError", "Could not open test data"));

      commit("setData", csvData);
      commit("resetFilters");
    },
    loadDataFromFile({ state, commit }, file) {
      if (file) {
        state.loaded = false;
        state.fetchingData = true;
        state.dataError = "";
        state.selectedDataSource = {
          localFile: file,
          remoteFileUrl: null
        };

        var reader = new FileReader();
        reader.onloadend = async function(evt) {
          var dataUrl = evt.target.result;
          // The following call results in an "Access denied" error in IE.
          let csvData = await d3
            .csv(dataUrl, d3.autoType)
            .catch(err =>
              commit("setDataError", "Could not open CSV file. " + err.message)
            );
          commit("setData", csvData);
          commit("setSlideTitleFromData", file.name, { root: true });
          commit("resetFilters");
        };
        reader.onerror = async function(evt) {
          commit("setDataError", "Could not open CSV file.");
        };
        reader.readAsDataURL(file);
      }
    },
    async loadData({ state, commit }, filename) {
      state.loaded = false;
      state.fetchingData = true;
      state.dataError = "";
      state.selectedDataSource = {
        localFile: null,
        remoteFileUrl: filename
      };
      let csvData = await d3
        .csv(process.env.VUE_APP_SCRAPER_URL + "data/" + filename, d3.autoType)
        .catch(err => {
          commit("setDataError", "Could not open CSV file. " + err.message);
        });
      if (csvData) {
        commit("setData", csvData);
        commit("setSlideTitleFromData", filename, { root: true });
        commit("resetFilters");
      }
    }
  }
};
