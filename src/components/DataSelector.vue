<template>
  <div class="data-selector">
    <b-alert :show="dataError != ''" class="error-bar" variant="warning">
      {{ dataError }}
    </b-alert>
    <div class="data-selector-line">
      <div class="upload-button-container align-self-center w-100">
        <div class="upload-file-name" v-if="selectedFile">
          {{ selectedFile.name }}
        </div>

        <fw-button class="upload-button btn-block" @click="openSelectFile">
          Upload .csv
          <input
            type="file"
            ref="fileSelector"
            style="display: none"
            accept="text/csv"
            @change="onSelectFile"
          />
        </fw-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "DataSelector",
  mounted() {},
  computed: {
    ...mapState({
      remoteFileList: state => state.remoteFileList,
      selectedFile: state => state.data.selectedDataSource.localFile,
      selectedRemote: state => state.data.selectedDataSource.remoteFileUrl,
      dataError: state => state.data.dataError
    })
  },
  methods: {
    openSelectFile() {
      this.$refs.fileSelector.click();
    },
    onSelectFile(evt) {
      let file = evt.target.files.length > 0 && evt.target.files[0];
      if (file) {
        this.$store.dispatch("data/loadDataFromFile", file);
      }
    },
    selectRemoteFile(el) {
      this.$store.dispatch("data/loadData", el);
    }
  }
};
</script>

<style lang="stylus" scoped>
.data-selector
  .error-bar
    width 100%
    margin 5px 0px
    padding 5px
    font-size 0.7em
  .data-selector-line
    display flex
    align-items: flex-end
  .upload-button
    max-height 35px
  .upload-file-name
    max-width 180px
    white-space nowrap
    margin-bottom 5px
    overflow hidden
    text-overflow ellipsis
    font-size 0.7rem
    color #495057
</style>
