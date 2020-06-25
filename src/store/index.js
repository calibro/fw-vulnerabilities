import Vue from "vue";
import Vuex from "vuex";
import data from "./modules/data";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    data
  },
  state: {
    groupBy: "State",
    colorBy: "Priority",
    sortBy: "Count",
    dotSize: 5,
    showSLA: false,
    showDescriptionNote: false,
    slideTitle: "",
    slideSource: "",
    slideSize: "1920:1080",
    remoteFileList: [],
    currentFilterPreset: null,
    presetOptionsList: []
  },
  getters: {
    slideSizeArray: state => {
      return state.slideSize.split(":");
    }
  },
  mutations: {
    setGroupBy(state, val) {
      state.groupBy = val;
    },
    setColorBy(state, val) {
      state.colorBy = val;
    },
    setSortBy(state, val) {
      state.sortBy = val;
    },
    setDotSize(state, val) {
      state.dotSize = +val;
    },
    setShowSLA(state, val) {
      state.showSLA = val;
    },
    setShowDescriptionNote(state, val) {
      state.showDescriptionNote = val;
    },
    setslideTitle(state, val) {
      state.slideTitle = val;
    },
    setSlideTitleFromData(state, val) {
      state.slideTitle = val.substring(0, val.lastIndexOf("."));
    },
    setSlideSource(state, val) {
      state.slideSource = val;
    },
    setSlideSize(state, val) {
      state.slideSize = val;
    },
    setViewPreset(state, values) {
      Object.keys(values).forEach(key => {
        Vue.set(state, key, values[key])
      })
    },
    setPresetOptionsList(state, val) {
      state.presetOptionsList = val;
    }
  },
  actions: {
    loadPresetList({ state, commit }) {
      axios.get("./data/filterPresets.json").then(resp => {
        commit("setPresetOptionsList", resp.data);
      });
    }
  }
});
