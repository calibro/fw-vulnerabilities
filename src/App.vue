<template>
  <div id="app">
    <div class="fw-header">
      <b-container class="h-100">
        <b-row class="h-100">
          <b-col>
            <div
              class="d-flex h-100 align-items-center justify-content-between"
            >
              <div class="logoCont">
                <img src="./assets/fwlogo.svg" height="100%" width="auto" />
              </div>
              <h6 class="my-0 text-uppercase">
                cybersecurity datavizlab
              </h6>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div v-if="showApp" class="ui-body">
      <div class="options-bar-container">
        <options-bar></options-bar>
      </div>
      <div class="slide-container item-container">
        <div class="slide-box" v-resize="onResize">
          <slide-container ref="slide"></slide-container>
        </div>
        <filter-sidebar></filter-sidebar>
      </div>
      <div class="export-bar-container">
        <export-bar @export="doExport"></export-bar>
      </div>
    </div>
    <div v-else class="load-data-ui">
      <data-selector></data-selector> or <span @click="loadTestData" class="data-link">use test data</span>
    </div>
  </div>
</template>

<script>
import SlideContainer from "./components/SlideContainer.vue";
import OptionsBar from "./components/OptionsBar.vue";
import ExportBar from "./components/ExportBar.vue";
import FilterSidebar from "./components/FilterSidebar.vue";
import DataSelector from "./components/DataSelector.vue";
import resize from "vue-resize-directive";

export default {
  name: "app",
  components: {
    SlideContainer,
    ExportBar,
    OptionsBar,
    FilterSidebar,
    DataSelector
  },
  mounted() {
    this.$store.dispatch("loadPresetList");
  },
  computed: {
    showApp() {
      return (
        !this.$store.state.data.firstLoad || this.$store.state.data.fetchingData
      );
    }
  },
  methods: {
    doExport(format, title) {
      this.$refs.slide.exportImage(format, title);
    },
    onResize() {
      this.$refs.slide.resize();
    },
    loadTestData() {
      this.$store.dispatch("data/loadTestData");
    }
  },
  directives: {
    resize
  }
};
</script>
<style lang="stylus">
body
  margin 0
  padding 0
#app
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  max-height 100vh
  height 100vh
  display flex
  flex-direction column
  .item-container
    > div
      width 80%
      margin auto
  .fw-header
    background #000
    color #ffc107
    align-items: center;
    display: flex;
    height: 40px
  .logoCont
    height: 40px
    padding-top 10px
    padding-bottom 5px
  .ui-body
    display: flex
    height: calc(100vh - 40px)
    flex-direction column
  .load-data-ui
    display: flex
    height: 100%
    justify-content center
    align-items center
    background-color: #F2F2F2
    .data-selector
      margin-right 5px
  .data-link
    text-decoration underline
    margin-left 5px
    cursor pointer
  .options-bar-container
    border-bottom 1px solid #ccc
    padding: 15px 0
  .export-bar-container
    border-top 1px solid #ccc
    padding: 15px 0
  .slide-container
    display flex
    flex 1 1 auto
    background #f2f2f2
    overflow: hidden;
    position relative
    .slide-box
      width 80%
      margin 15px auto
      overflow hidden
      text-align: center
  .fw-option-select-label
    font-size: 0.7rem
    text-transform:uppercase
    color: #495057
    margin-bottom:2px
</style>
