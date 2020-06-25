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
    sortBy: "count",
    dotSize: 5,
    showSLA: false,
    showDescriptionNote: false,
    slideTitle: "",
    slideSource: "",
    slideSize: "1920:1080",
    remoteFileList: []
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
    setRemoteFileList(state, val) {
      state.remoteFileList = val;
    }
  },
  actions: {}
});
