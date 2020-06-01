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
    setslideTitle(state, val) {
      state.slideTitle = val;
    },
    setSlideTitleFromData(state, val) {
      state.slideTitle = val.substring(0, val.lastIndexOf(".")).split("T")[0];
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
  actions: {
  }
});
