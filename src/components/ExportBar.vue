<template>
  <b-container class="export-bar">
    <b-row>
      <b-col>
        <fw-input
          label="Title"
          :value="slideTitle"
          @input="setslideTitle"
          placeholder="your slide title"
        ></fw-input>
      </b-col>
      <b-col>
        <div class="fw-option-select-label">export</div>
        <b-row>
          <b-col>
            <b-button
              variant="warning"
              class="btn-block fw-button"
              @click="() => onExport('svg', slideTitle)"
            >
              .svg
            </b-button>
          </b-col>
          <b-col>
            <b-button
              variant="warning"
              class="btn-block fw-button"
              @click="() => onExport('png', slideTitle)"
            >
              .png
            </b-button>
          </b-col>
        </b-row>
      </b-col>
      <b-col>
        <fw-select
          label="Slide size"
          :value="slideSize"
          @change="setSlideSize"
          :options="slideSizeOptions"
        ></fw-select>
      </b-col>
      <b-col>
        <fw-select
          label="Load Presets"
          value="default"
          @change="changePreset"
          :options="presetOptionsList"
        ></fw-select>
      </b-col>
      <!-- <b-col>
        <fw-input
          label="Source"
          :value="slideSource"
          @input="setSlideSource"
          placeholder="additional information"
        ></fw-input>
      </b-col> -->
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "ExportBar",
  data() {
    return {
      slideSizeOptions: [
        { value: "1920:1080", text: "1920 x 1080 (16:9)" },
        { value: "1024:768", text: "1024 x 768 (4:3)" },
        { value: "1191:842", text: "1191 x 842 (A3 landscape)" }
      ]
    };
  },
  computed: {
    ...mapState(["slideTitle", "slideSource", "slideSize", "presetOptionsList"])
  },
  methods: {
    ...mapMutations([
      "setslideTitle",
      "setSlideSource",
      "setSlideSize",
      "setViewPreset",
      "data/setFilterPreset",
      "data/resetFilters"
    ]),

    changePreset(val) {
      if (val != "default") {
        this["setViewPreset"](val.viewOptions);
        this["data/setFilterPreset"](val.filtersOptions);
      } else {
        const defaultOptions = {
          groupBy: "vit_state",
          sortBy: "Count",
          colorBy: "vit_priority",
          showSLA: false
        };
        this["setViewPreset"](defaultOptions);
        this["data/resetFilters"]();
      }
    },
    onExport(format, title) {
      this.$emit("export", format, title);
    }
  }
};
</script>

<style scoped lang="stylus">
.export-bar
  width 100%
  .row
    .export-button
      width 100%
.fw-button
  font-size: 0.7rem
  padding 0.525rem 0.75rem
  text-transform uppercase
</style>
