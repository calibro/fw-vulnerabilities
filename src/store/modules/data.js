import * as d3 from "d3";
import { groups } from "d3-array";
import Vue from "vue";
import _ from "underscore";

const mandatoryCols = [
  "vit_number",
  "vit_u_vulnerability",
  "vit_u_vulnerability_description_text",
  "vit_source",
  "vit_u_real_target",
  "dmp_u_esposizione",
  "dmp_u_fatturato_esposizione_residuo",
  "vit_priority",
  "vit_u_cvss_score",
  "vit_state",
  "vit_substate",
  "vit_u_close_code",
  "vit_u_handler",
  "usr_u_business_unit",
  "vit_age",
  "vit_u_year",
  "vit_sys_id",
  "sir_u_remediation_cost",
  "sir_u_workaround_cost"
];

const filterCols = [
  {
    key: "vit_u_real_target",
    type: "group-list"
  },
  {
    key: "vit_u_cvss_score",
    type: "range"
  },
  {
    key: "vit_priority",
    type: "checkbox",
    order: ["Low", "Medium", "High"]
  },
  {
    key: "vit_state",
    type: "checkbox",
    order: ["In Review", "Remediation", "Closed"]
  },
  {
    key: "vit_u_close_code",
    type: "checkbox"
  },
  {
    key: "usr_u_business_unit",
    type: "checkbox"
  },
  {
    key: "vit_u_year",
    type: "checkbox"
  },
  {
    key: "dmp_u_esposizione",
    type: "checkbox",
    multiple: true
  },
  {
    key: "vit_source",
    type: "checkbox"
  },
  {
    key: "vit_u_handler",
    type: "group-list"
  }
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
      let fData = state.csvData;

      Object.keys(state.filters).forEach(filterKey => {
        let filterCol = filterCols.find(el => el.key == filterKey);
        if (filterCol.type == "checkbox") {
          if (filterCol.multiple) {
            fData = fData.filter(
              e =>
                _.intersection(state.filters[filterKey], e[filterKey]).length >
                0
            );
          } else {
            fData = fData.filter(e =>
              state.filters[filterKey].includes(e[filterKey])
            );
          }
        } else if (filterCol.type == "range") {
          fData = fData.filter(
            e =>
              state.filters[filterKey][0] <= e[filterKey] &&
              state.filters[filterKey][1] >= e[filterKey]
          );
        } else if (filterCol.type == "group-list") {
          fData = fData.filter(e =>
            state.filters[filterKey].includes(String(e[filterKey]))
          );
        }
      });
      return fData;
    },
    isFilterActive: state => filterKey => {
      let filterCol = filterCols.find(el => el.key == filterKey);
      let isActive = false;
      if (state.filterOptions[filterKey] && state.filters[filterKey]) {
        if (filterCol.type == "range") {
          isActive = state.filterOptions[filterKey]
            .map((el, index) => el != state.filters[filterKey][index])
            .includes(true);
        } else {
          isActive =
            state.filterOptions[filterKey].length !=
            state.filters[filterKey].length;
        }
      }
      return isActive;
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
        data.forEach((d, index) => {
          d.dataId = index;
          filterCols.forEach(col => {
            if (col.type == "checkbox") {
              d[col.key] = d[col.key] ? d[col.key] : "N/A";
            }
          });

          //remove string spaces and split values
          let str = d["dmp_u_esposizione"].replace(/\s/g, "");
          d["dmp_u_esposizione"] = str.split(",");

          d["Sla"] = false;

          if (d["vit_priority"] === "High" && d["vit_age"] > 90) {
            d["Sla"] = true;
          }

          if (d["vit_priority"] === "Medium" && d["vit_age"] > 180) {
            d["Sla"] = true;
          }

          if (d["vit_priority"] === "Low" && d["vit_age"] > 365) {
            d["Sla"] = true;
          }
        });

        // Dynamically fill filters option and values based on map
        filterCols.forEach(filterCol => {
          let fOptions = [];
          if (filterCol.type == "checkbox") {
            let cVals = [];
            if (filterCol.multiple) {
              cVals = [...new Set(_.flatten(data.map(x => x[filterCol.key])))];
            } else {
              cVals = [...new Set(data.map(x => x[filterCol.key]))];
            }
            fOptions = cVals
              .filter(e => e)
              .sort((a, b) => {
                if (filterCol.order) {
                  return (
                    filterCol.order.indexOf(a) - filterCol.order.indexOf(b)
                  );
                }
                return a - b;
              });
          } else if (filterCol.type == "range") {
            let rangeVals = data.map(x => parseFloat(x[filterCol.key]));
            if (filterCol.key === "vit_u_cvss_score") {
              fOptions = [0.0, 10.0];
            } else {
              fOptions = [Math.min(...rangeVals), Math.max(...rangeVals)];
            }
          } else if (filterCol.type == "group-list") {
            fOptions = Object.keys(_.groupBy(data, d => d[filterCol.key]));
          }
          Vue.set(state.filterOptions, filterCol.key, fOptions.slice());
          Vue.set(state.filters, filterCol.key, fOptions.slice());
        });
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
      Vue.set(state, "filters", Object.assign({}, resetFilters));
    },
    setFilterPreset(state, values) {
      Object.keys(values).forEach(key => {
        Vue.set(state.filters, key, values[key]);
      });
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
