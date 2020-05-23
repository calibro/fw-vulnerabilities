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
  //"Real Target"
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
      // TODO: Filter!
      return state.csvData
    }
  },
  mutations: {
    setData(state, data) {
      state.fetchingData = false;
      if (_.every(mandatoryCols, c => data.columns.includes(c))) {
        state.csvData = data;
        state.firstLoad = false;
        state.loaded = true;

        // Dynamically fill filters option and values based on map
        filterCols.forEach(filterCol => {
          let fOptions = []
          if (filterCol.type == 'checkbox'){
            let cVals = []
            if (filterCol.multiple) {
              cVals = [...new Set(_.flatten(data.map(x => {
                //remove spaces in the value string
                let str = x[filterCol.key].replace(/\s/g, '');
                return str.split(',')
              })))]
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
          Vue.set(state.filterOptions, filterCol.key, fOptions)
          Vue.set(state.filters, filterCol.key, fOptions)
        })
      } else {
        state.csvData = [];
        state.hierarchy = [];
        state.dataError = "Wrong CSV format.";
      }
    },
    setFilterValue(state, key, val) {
      Vue.set(state.filters, key, val);
    },
    setExcludeNodes(state, val) {
      Vue.set(state.filters, "excludeNodes", val);
    },
    setDataError(state, error) {
      state.loaded = false;
      state.fetchingData = false;
      state.dataError = error;
    },
    toggleExcludeNode(state, val) {
      let exHierarchy = state.filters.excludeNodes;
      let findIndex = exHierarchy.findIndex(
        e => e.level == val.level && e.name == val.name
      );
      if (findIndex >= 0 || val.forceCheck) {
        exHierarchy.splice(findIndex, 1);
      } else {
        exHierarchy.push(val);
      }
      Vue.set(state.filters, "excludeNodes", exHierarchy);
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
        .csv("./data/test.csv", (d)=> {
          console.log(d)
        }, d3.autoType)
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
